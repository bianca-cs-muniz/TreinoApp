import { AuthShell } from "../../utils/components/authShell";
import { Voltar } from "../../utils/components/voltar";
import { SelectCustomizado } from "../../utils/components/selectCustomizado";
import { controllerProgresso } from "./controller";
import { MetricasProgresso } from "./components/metricas";
import { HeatmapAnoProgresso } from "./components/heatmapAno";
import { HistoricoTreinos } from "./components/historico";
import { CabecalhoProgresso, TituloProgresso } from "./styles";

export const ProgressoPage = () => {
  const { carregando, ano, setAno, opcoesAno, filtroMes, setFiltroMes, heatmap, metricas, historico } =
    controllerProgresso();

  return (
    <AuthShell>
      <div>
        <Voltar />

        <CabecalhoProgresso>
          <TituloProgresso>Relatório</TituloProgresso>
          <SelectCustomizado
            value={ano}
            onChange={setAno}
            opcoes={opcoesAno.map((y) => ({ value: y, label: String(y) }))}
          />
        </CabecalhoProgresso>

        <MetricasProgresso
          totalTreinos={metricas.totalTreinos}
          diasTreinados={metricas.diasTreinados}
          maiorSequencia={metricas.maiorSequencia}
        />

        <HeatmapAnoProgresso heatmap={heatmap} />

        <HistoricoTreinos
          historico={historico}
          carregando={carregando}
          filtroMes={filtroMes}
          setFiltroMes={setFiltroMes}
        />
      </div>
    </AuthShell>
  );
};
