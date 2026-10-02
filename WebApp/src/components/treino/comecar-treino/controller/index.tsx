import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ComecarTreinoService, { ITreino, ISessaoTreino, ISetLog } from "../service";

export function formatarMMSS(totalSegundos: number) {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos}:${String(segundos).padStart(2, "0")}`;
}

export function formatarRotuloDescanso(segundos: number | null) {
  if (!segundos) return null;
  if (segundos < 60) return `${segundos}s`;
  const minutos = segundos / 60;
  return `${minutos % 1 === 0 ? minutos : minutos.toFixed(1)}min`;
}

export interface EstadoDescanso {
  setLogId: string;
  fimDescansoEm: number; // Date.now() + totalSeg * 1000
  totalSeg: number;
  segundosRestantes: number;
}

function tocarBipDescanso() {
  try {
    const AudioContextClasse = window.AudioContext || (window as any).webkitAudioContext;
    const contexto = new AudioContextClasse();
    const osc = contexto.createOscillator();
    const ganho = contexto.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    ganho.gain.setValueAtTime(0.2, contexto.currentTime);
    ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.5);
    osc.connect(ganho);
    ganho.connect(contexto.destination);
    osc.start();
    osc.stop(contexto.currentTime + 0.5);
  } catch {
    // navegador sem suporte a Web Audio — segue sem som.
  }
}

/** Envia notificação via SW (funciona em background) ou fallback para Notification API */
async function agendarNotificacaoDescanso(delayMs: number) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const registro = await navigator.serviceWorker.ready.catch(() => null);
  if (registro?.active) {
    registro.active.postMessage({
      type: "SCHEDULE_NOTIFICATION",
      delayMs,
      title: "Descanso terminado",
      body: "Hora de continuar a série! 💪",
    });
    return;
  }
  // fallback: Notification API direta (só funciona em primeiro plano)
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    setTimeout(() => {
      new Notification("Descanso terminado", { body: "Hora de continuar a série! 💪" });
    }, delayMs);
  }
}


async function cancelarNotificacaoDescanso() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const registro = await navigator.serviceWorker.ready.catch(() => null);
  registro?.active?.postMessage({ type: "CANCEL_NOTIFICATION" });
}

/** Agenda notificações push para 1h, 1h30 e 2h a partir de startedAt (timestamp ms).
 *  Usa timestamps absolutos — funciona mesmo se o SW for reiniciado antes de disparar. */
async function agendarNotificacoesTreino(startedAtMs: number) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const registro = await navigator.serviceWorker.ready.catch(() => null);
  if (!registro?.active) return;

  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    await Notification.requestPermission().catch(() => {});
  }
  if (typeof Notification !== "undefined" && Notification.permission !== "granted") return;

  const marcos = [
    { fireAtMs: startedAtMs + 3600 * 1000, title: "1 hora de treino! 🏋️", body: "Ainda na academia? Confere se esqueceu de parar o cronômetro.", tag: "treino-1h" },
    { fireAtMs: startedAtMs + 5400 * 1000, title: "1h 30min de treino! 💪", body: "Tudo bem? Lembra de finalizar o treino quando terminar.", tag: "treino-1h30" },
    { fireAtMs: startedAtMs + 7200 * 1000, title: "2 horas de treino! ⏱️", body: "Treino muito longo? Veja se o cronômetro está rodando sem querer.", tag: "treino-2h" },
  ];

  registro.active.postMessage({ type: "SCHEDULE_TREINO_TIMERS", marcos });
}

async function cancelarNotificacoesTreino() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const registro = await navigator.serviceWorker.ready.catch(() => null);
  registro?.active?.postMessage({ type: "CANCEL_TREINO_TIMERS" });
}

async function registrarServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("/sw.js");
  } catch {
    // SW não disponível (ex: http:// local sem HTTPS) — segue sem ele.
  }
}


export function controllerComecarTreino() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [treino, setTreino] = useState<ITreino | null>(null);
  const [imagens, setImagens] = useState<Record<string, string>>({});
  const [sessao, setSessao] = useState<ISessaoTreino | null>(null);
  const [iniciando, setIniciando] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [segundosDecorridos, setSegundosDecorridos] = useState(0);
  const [cronometroRodando, setCronometroRodando] = useState(false);
  const [descanso, setDescanso] = useState<EstadoDescanso | null>(null);
  const [finalizando, setFinalizando] = useState(false);
  const [mostrarModalFinalizar, setMostrarModalFinalizar] = useState(false);
  const [comentario, setComentario] = useState("");
  const [erroSnackbar, setErroSnackbar] = useState<string | null>(null);
  const [verificandoSessaoAtiva, setVerificandoSessaoAtiva] = useState(true);
  const [avisoTempo, setAvisoTempo] = useState<string | null>(null);
  const marcosDisparadosRef = useRef<Set<number>>(new Set());

  // Registra o Service Worker ao montar
  useEffect(() => {
    registrarServiceWorker();
  }, []);

  useEffect(() => {
    if (id) ComecarTreinoService.buscarTreino(id).then(setTreino).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    ComecarTreinoService.buscarSessaoAtiva()
      .then((ativa) => {
        if (!ativa || ativa.workoutId !== id) return;
        setSessao(ativa);
        const decorrido = Math.floor((Date.now() - new Date(ativa.startedAt).getTime()) / 1000);
        setSegundosDecorridos(Math.max(decorrido, 0));
        setCronometroRodando(true);
        // Reagenda as notificações de tempo para a sessão que já estava ativa
        agendarNotificacoesTreino(new Date(ativa.startedAt).getTime());
      })
      .catch(() => {
        // sem sessão ativa — segue o fluxo normal de "Começar treino".
      })
      .finally(() => setVerificandoSessaoAtiva(false));
  }, [id]);

  useEffect(() => {
    if (!treino) return;
    treino.exercises.forEach((ex) => {
      if (!ex.externalApiId) return;
      ComecarTreinoService.buscarExercicioPorId(ex.externalApiId)
        .then((detalhes) => setImagens((prev) => ({ ...prev, [ex.id]: detalhes.images[0] })))
        .catch(() => {
          // sem imagem disponível — mantém o placeholder.
        });
    });
  }, [treino]);

  useEffect(() => {
    if (!cronometroRodando || sessao?.finishedAt) return;
    const interval = setInterval(() => setSegundosDecorridos((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [cronometroRodando, sessao?.finishedAt]);

  // Dispara aviso na tela nos marcos de 1h, 1h30min e 2h (cada um uma única vez)
  useEffect(() => {
    if (!cronometroRodando) return;
    const marcos = [
      { seg: 3600,   msg: "⏱️ 1 hora de treino! Esqueceu de parar?" },
      { seg: 5400,   msg: "⏱️ 1h 30min de treino! Tudo bem?" },
      { seg: 7200,   msg: "⏱️ 2 horas de treino! Confere o cronômetro." },
    ];
    for (const marco of marcos) {
      if (segundosDecorridos >= marco.seg && !marcosDisparadosRef.current.has(marco.seg)) {
        marcosDisparadosRef.current.add(marco.seg);
        setAvisoTempo(marco.msg);
        break; // mostra um por vez
      }
    }
  }, [segundosDecorridos, cronometroRodando]);

  // no PWA/iOS o JS para de rodar quando a tela trava ou o app vai pra segundo plano —
  // o setInterval acima fica "atrasado". Ao voltar, recalcula o tempo real a partir de
  // startedAt em vez de confiar no contador local (só se o cronômetro não estava pausado).
  useEffect(() => {
    function recalcularSegundosDecorridos() {
      if (!sessao || sessao.finishedAt || !cronometroRodando) return;
      const decorrido = Math.floor((Date.now() - new Date(sessao.startedAt).getTime()) / 1000);
      setSegundosDecorridos(Math.max(decorrido, 0));
    }

    // Ao voltar ao foco: recalcula o descanso restante a partir do timestamp absoluto
    function recalcularDescanso() {
      setDescanso((prev) => {
        if (!prev) return null;
        const restante = Math.max(0, Math.round((prev.fimDescansoEm - Date.now()) / 1000));
        if (restante <= 0) {
          tocarBipDescanso();
          return null;
        }
        return { ...prev, segundosRestantes: restante };
      });
    }

    function aoMudarVisibilidade() {
      if (document.visibilityState === "visible") {
        recalcularSegundosDecorridos();
        recalcularDescanso();
      }
    }

    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    window.addEventListener("pageshow", recalcularSegundosDecorridos);
    window.addEventListener("focus", recalcularSegundosDecorridos);

    return () => {
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      window.removeEventListener("pageshow", recalcularSegundosDecorridos);
      window.removeEventListener("focus", recalcularSegundosDecorridos);
    };
  }, [sessao, cronometroRodando]);

  // Timer de descanso usando timestamp absoluto — não depende do JS rodar em background.
  // A cada segundo apenas decrementa a contagem visual; a lógica real usa fimDescansoEm.
  useEffect(() => {
    if (!descanso) return;
    if (descanso.segundosRestantes <= 0) {
      tocarBipDescanso();
      setDescanso(null);
      return;
    }
    const timeout = setTimeout(() => {
      setDescanso((prev) => {
        if (!prev) return null;
        const restante = Math.max(0, Math.round((prev.fimDescansoEm - Date.now()) / 1000));
        return { ...prev, segundosRestantes: restante };
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [descanso]);

  function pularDescanso() {
    cancelarNotificacaoDescanso();
    setDescanso(null);
  }

  async function iniciarTreino() {
    if (!treino || iniciando) return;
    setIniciando(true);
    setErroSnackbar(null);
    try {
      const novaSessao = await ComecarTreinoService.iniciarSessao(treino.id);
      setSessao(novaSessao);
      setSegundosDecorridos(0);
      setCronometroRodando(true);
      agendarNotificacoesTreino(new Date(novaSessao.startedAt).getTime());
    } catch (err: any) {
      setErroSnackbar(err?.message || "Não foi possível iniciar o treino.");
    } finally {
      setIniciando(false);
    }
  }

  function fecharErroSnackbar() {
    setErroSnackbar(null);
  }

  function atualizarSetLogNaSessao(atualizado: ISetLog) {
    setSessao((prev) =>
      prev ? { ...prev, setLogs: prev.setLogs.map((log) => (log.id === atualizado.id ? atualizado : log)) } : prev
    );
  }

  async function alternarConcluidoSerie(log: ISetLog, restSec: number | null) {
    if (!sessao) return;
    const completed = !log.completed;

    // marca na hora (otimista) — não espera o servidor responder pra sentir instantâneo.
    atualizarSetLogNaSessao({ ...log, completed, completedAt: completed ? new Date().toISOString() : null });
    if (completed && restSec) {
      const fimDescansoEm = Date.now() + restSec * 1000;
      setDescanso({ setLogId: log.id, fimDescansoEm, totalSeg: restSec, segundosRestantes: restSec });

      // Pede permissão na primeira vez e agenda notificação via SW (funciona em background)
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        await Notification.requestPermission().catch(() => {});
      }
      agendarNotificacaoDescanso(restSec * 1000);
    } else if (!completed && descanso?.setLogId === log.id) {
      cancelarNotificacaoDescanso();
      setDescanso(null);
    }

    try {
      const atualizado = await ComecarTreinoService.atualizarSetLog(sessao.id, log.id, { completed });
      atualizarSetLogNaSessao(atualizado);
    } catch (err: any) {
      atualizarSetLogNaSessao(log); // reverte pro estado anterior
      if (completed && restSec) {
        cancelarNotificacaoDescanso();
        setDescanso(null);
      }
      setErroSnackbar(err?.message || "Não foi possível marcar a série. Tente novamente.");
    }
  }

  async function editarSerieLog(log: ISetLog, patch: { weightKg?: number; reps?: number }) {
    if (!sessao) return;
    try {
      const atualizado = await ComecarTreinoService.atualizarSetLog(sessao.id, log.id, patch);
      atualizarSetLogNaSessao(atualizado);
    } catch (err: any) {
      setErroSnackbar(err?.message || "Não foi possível salvar. Tente novamente.");
    }
  }

  async function confirmarFinalizacao(segundosAjustados?: number) {
    if (!sessao || finalizando) return;
    setFinalizando(true);
    setErroSnackbar(null);
    cancelarNotificacoesTreino(); // cancela push de 1h/1h30/2h antes de finalizar
    try {
      const duracao = segundosAjustados ?? segundosDecorridos;
      const sessaoFinalizada = await ComecarTreinoService.finalizarSessao(
        sessao.id,
        duracao,
        comentario.trim() || undefined
      );
      setCronometroRodando(false);
      setDescanso(null);
      setMostrarModalFinalizar(false);
      setSessao((prev) => (prev ? { ...prev, finishedAt: sessaoFinalizada.finishedAt } : prev));
      navigate("/");
    } catch (err: any) {
      console.error("Falha ao finalizar treino:", err);
      setErroSnackbar(err?.message || "Não foi possível concluir o treino. Tente novamente.");
      setFinalizando(false);
    }
  }

  return {
    treino,
    imagens,
    sessao,
    iniciando,
    modoEdicao,
    setModoEdicao,
    segundosDecorridos,
    cronometroRodando,
    setCronometroRodando,
    descanso,
    pularDescanso,
    finalizando,
    mostrarModalFinalizar,
    setMostrarModalFinalizar,
    comentario,
    setComentario,
    erroSnackbar,
    fecharErroSnackbar,
    verificandoSessaoAtiva,
    iniciarTreino,
    alternarConcluidoSerie,
    editarSerieLog,
    confirmarFinalizacao,
    avisoTempo,
    dispensarAvisoTempo: () => setAvisoTempo(null),
  };
}
