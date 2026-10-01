import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TreinoService, { IExercicioTreinoExistente, ISugestaoExercicio } from "../service";

export interface SerieRascunho {
  peso: string;
  repeticoes: string;
}

export interface ExercicioRascunho {
  idLocal: string;
  selecionado: boolean;
  nome: string;
  externalApiId?: string;
  imagemUrl?: string;
  termoBusca: string;
  sugestoes: ISugestaoExercicio[];
  descansoSeg: number;
  observacao: string;
  series: SerieRascunho[];
}

function criarExercicioVazio(): ExercicioRascunho {
  return {
    idLocal: crypto.randomUUID(),
    selecionado: false,
    nome: "",
    termoBusca: "",
    sugestoes: [],
    descansoSeg: 60,
    observacao: "",
    series: [{ peso: "", repeticoes: "" }],
  };
}

function mapearExercicioExistente(ex: IExercicioTreinoExistente): ExercicioRascunho {
  return {
    idLocal: crypto.randomUUID(),
    selecionado: true,
    nome: ex.name,
    externalApiId: ex.externalApiId ?? undefined,
    termoBusca: "",
    sugestoes: [],
    descansoSeg: ex.restSec ?? 60,
    observacao: (ex as any).notes ?? "",
    series: ex.sets.map((s) => ({
      peso: s.weightKg != null ? String(s.weightKg) : "",
      repeticoes: s.reps != null ? String(s.reps) : "",
    })),
  };
}

export function controllerTreino(workoutIdParaEditar?: string) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState<number | null>(null);
  const [exercicios, setExercicios] = useState<ExercicioRascunho[]>([criarExercicioVazio()]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(false);
  const [carregandoEdicao, setCarregandoEdicao] = useState(!!workoutIdParaEditar);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  useEffect(() => {
    if (!workoutIdParaEditar) return;

    TreinoService.buscarTreinoPorId(workoutIdParaEditar)
      .then((treino) => {
        setNome(treino.name);
        setDiaSemana(treino.weekDay === null || treino.weekDay === undefined ? null : Number(treino.weekDay));
        const rascunhos = treino.exercises.map(mapearExercicioExistente);
        setExercicios(rascunhos);

        rascunhos.forEach((ex) => {
          if (!ex.externalApiId) return;
          TreinoService.buscarExercicioPorId(ex.externalApiId)
            .then((detalhes) => atualizarExercicio(ex.idLocal, { imagemUrl: detalhes.images[0] }))
            .catch(() => {
              // sem imagem disponível — mantém o placeholder.
            });
        });
      })
      .finally(() => setCarregandoEdicao(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutIdParaEditar]);

  function atualizarExercicio(idLocal: string, patch: Partial<ExercicioRascunho>) {
    setExercicios((prev) => prev.map((ex) => (ex.idLocal === idLocal ? { ...ex, ...patch } : ex)));
  }

  function alterarBusca(idLocal: string, termo: string) {
    atualizarExercicio(idLocal, { termoBusca: termo, sugestoes: [] });

    clearTimeout(debounceRef.current);
    if (termo.trim().length < 2) return;

    debounceRef.current = setTimeout(async () => {
      try {
        const sugestoes = await TreinoService.buscarExercicios(termo.trim());
        atualizarExercicio(idLocal, { sugestoes });
      } catch {
        atualizarExercicio(idLocal, { sugestoes: [] });
      }
    }, 350);
  }

  async function selecionarSugestao(idLocal: string, sugestao: ISugestaoExercicio) {
    atualizarExercicio(idLocal, {
      selecionado: true,
      nome: sugestao.name,
      externalApiId: sugestao.id,
      sugestoes: [],
    });

    try {
      const detalhes = await TreinoService.buscarExercicioPorId(sugestao.id);
      atualizarExercicio(idLocal, { imagemUrl: detalhes.images[0] });
    } catch {
      // sem imagem disponível — mantém o placeholder.
    }
  }

  function confirmarNomeManual(idLocal: string, termo: string) {
    if (!termo.trim()) return;
    atualizarExercicio(idLocal, { selecionado: true, nome: termo.trim(), sugestoes: [] });
  }

  function removerExercicio(idLocal: string) {
    setExercicios((prev) => prev.filter((ex) => ex.idLocal !== idLocal));
  }

  function adicionarExercicio() {
    setExercicios((prev) => [...prev, criarExercicioVazio()]);
  }

  function adicionarSerie(idLocal: string) {
    setExercicios((prev) =>
      prev.map((ex) => (ex.idLocal === idLocal ? { ...ex, series: [...ex.series, { peso: "", repeticoes: "" }] } : ex))
    );
  }

  function atualizarSerie(idLocal: string, index: number, patch: Partial<SerieRascunho>) {
    const patchSemNegativo: Partial<SerieRascunho> = { ...patch };
    if (patch.peso !== undefined) patchSemNegativo.peso = patch.peso.replace(/-/g, "");
    if (patch.repeticoes !== undefined) patchSemNegativo.repeticoes = patch.repeticoes.replace(/-/g, "");

    setExercicios((prev) =>
      prev.map((ex) =>
        ex.idLocal === idLocal
          ? { ...ex, series: ex.series.map((s, i) => (i === index ? { ...s, ...patchSemNegativo } : s)) }
          : ex
      )
    );
  }

  function removerSerie(idLocal: string, index: number) {
    setExercicios((prev) =>
      prev.map((ex) => (ex.idLocal === idLocal ? { ...ex, series: ex.series.filter((_, i) => i !== index) } : ex))
    );
  }

  const exerciciosSelecionados = exercicios.filter((ex) => ex.selecionado);
  const podeSalvar = nome.trim().length > 0 && !salvando;

  async function salvarTreino() {
    if (!podeSalvar) return;
    setSalvando(true);
    setErro(false);
    try {
      const payload = {
        name: nome.trim(),
        weekDay: diaSemana ?? undefined,
        exercises: exerciciosSelecionados.map((ex) => ({
          name: ex.nome,
          externalApiId: ex.externalApiId,
          restSec: ex.descansoSeg,
          notes: ex.observacao.trim() || undefined,
          sets: ex.series
            .filter((s) => s.peso || s.repeticoes)
            .map((s) => ({
              weightKg: s.peso ? Number(s.peso) : undefined,
              reps: s.repeticoes ? Number(s.repeticoes) : undefined,
            })),
        })),
      };

      if (workoutIdParaEditar) {
        await TreinoService.atualizarTreino(workoutIdParaEditar, payload);
      } else {
        await TreinoService.criarTreino(payload);
      }
      navigate("/");
    } catch {
      setErro(true);
    } finally {
      setSalvando(false);
    }
  }

  return {
    nome,
    setNome,
    diaSemana,
    setDiaSemana,
    exercicios,
    salvando,
    erro,
    podeSalvar,
    carregandoEdicao,
    editando: !!workoutIdParaEditar,
    atualizarExercicio,
    alterarBusca,
    selecionarSugestao,
    confirmarNomeManual,
    removerExercicio,
    adicionarExercicio,
    adicionarSerie,
    atualizarSerie,
    removerSerie,
    salvarTreino,
  };
}
