import { useEffect, useState } from "react";
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
  segundosRestantes: number;
  totalSeg: number;
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

  useEffect(() => {
    if (!descanso) return;
    if (descanso.segundosRestantes <= 0) {
      setDescanso(null);
      return;
    }
    const timeout = setTimeout(() => {
      setDescanso((prev) => (prev ? { ...prev, segundosRestantes: prev.segundosRestantes - 1 } : null));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [descanso]);

  async function iniciarTreino() {
    if (!treino || iniciando) return;
    setIniciando(true);
    setErroSnackbar(null);
    try {
      const novaSessao = await ComecarTreinoService.iniciarSessao(treino.id);
      setSessao(novaSessao);
      setSegundosDecorridos(0);
      setCronometroRodando(true);
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
    try {
      const atualizado = await ComecarTreinoService.atualizarSetLog(sessao.id, log.id, { completed });
      atualizarSetLogNaSessao(atualizado);
      if (completed && restSec) {
        setDescanso({ setLogId: log.id, segundosRestantes: restSec, totalSeg: restSec });
      } else if (!completed && descanso?.setLogId === log.id) {
        setDescanso(null);
      }
    } catch {
      // erro silencioso
    }
  }

  async function editarSerieLog(log: ISetLog, patch: { weightKg?: number; reps?: number }) {
    if (!sessao) return;
    try {
      const atualizado = await ComecarTreinoService.atualizarSetLog(sessao.id, log.id, patch);
      atualizarSetLogNaSessao(atualizado);
    } catch {
      // erro silencioso
    }
  }

  async function confirmarFinalizacao() {
    if (!sessao || finalizando) return;
    setFinalizando(true);
    setErroSnackbar(null);
    try {
      const sessaoFinalizada = await ComecarTreinoService.finalizarSessao(
        sessao.id,
        segundosDecorridos,
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
  };
}
