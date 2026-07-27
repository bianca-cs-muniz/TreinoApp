import { useEffect, useMemo, useState } from "react";
import { buildYearHeatmap, dateKey, longestStreak } from "../../../utils/funcoes/heatmap";
import ProgressoService, { ISessaoConcluida } from "../service";

export function controllerProgresso() {
  const [sessoes, setSessoes] = useState<ISessaoConcluida[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [filtroMes, setFiltroMes] = useState<number | null>(new Date().getMonth());

  useEffect(() => {
    ProgressoService.listarSessoesConcluidas()
      .then(setSessoes)
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  const opcoesAno = useMemo(() => {
    const anos = new Set(sessoes.map((s) => new Date(s.startedAt).getFullYear()));
    anos.add(new Date().getFullYear());
    return Array.from(anos).sort((a, b) => b - a);
  }, [sessoes]);

  const datasAtivas = useMemo(() => new Set(sessoes.map((s) => dateKey(new Date(s.startedAt)))), [sessoes]);

  const sessoesDoAno = useMemo(
    () => sessoes.filter((s) => new Date(s.startedAt).getFullYear() === ano),
    [sessoes, ano]
  );

  const heatmap = useMemo(() => buildYearHeatmap(ano, datasAtivas), [ano, datasAtivas]);

  const metricas = useMemo(() => {
    const agora = new Date();
    const diasTreinadosMes = new Set(
      sessoes
        .filter((s) => {
          const d = new Date(s.startedAt);
          return d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear();
        })
        .map((s) => dateKey(new Date(s.startedAt)))
    ).size;

    const diasDoAno = new Set(sessoesDoAno.map((s) => dateKey(new Date(s.startedAt))));
    const chavesOrdenadas = Array.from(diasDoAno).sort();

    return {
      totalTreinos: sessoesDoAno.length,
      diasTreinados: diasTreinadosMes,
      maiorSequencia: longestStreak(chavesOrdenadas),
    };
  }, [sessoes, sessoesDoAno]);

  const historico = useMemo(() => {
    return sessoesDoAno
      .filter((s) => filtroMes === null || new Date(s.startedAt).getMonth() === filtroMes)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }, [sessoesDoAno, filtroMes]);

  return {
    carregando,
    ano,
    setAno,
    opcoesAno,
    filtroMes,
    setFiltroMes,
    heatmap,
    metricas,
    historico,
  };
}
