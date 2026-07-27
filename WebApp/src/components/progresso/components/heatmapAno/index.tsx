import { YearHeatmap } from "../../../../utils/funcoes/heatmap";
import {
  CartaoHeatmap,
  CelulaHeatmap,
  GradeCelulas,
  GradeMesesRotulos,
  LegendaHeatmap,
  LinhaHeatmap,
  RotuloMes,
  RotulosDiasSemana,
  SwatchLegenda,
  TextoLegenda,
} from "../../styles";

const CORES_LEGENDA = ["#1D2129", "rgba(255,90,54,0.18)", "rgba(255,90,54,0.4)", "rgba(255,90,54,0.68)", "#FF5A36"];

interface HeatmapAnoProgressoProps {
  heatmap: YearHeatmap;
}

export const HeatmapAnoProgresso = ({ heatmap }: HeatmapAnoProgressoProps) => {
  return (
    <CartaoHeatmap>
      <div style={{ minWidth: heatmap.numWeeks * 14 + 20 }}>
        <GradeMesesRotulos style={{ gridTemplateColumns: `repeat(${heatmap.numWeeks}, 11px)` }}>
          {heatmap.monthLabels.map((m) => (
            <RotuloMes key={m.col} style={{ gridColumn: m.col }}>
              {m.label}
            </RotuloMes>
          ))}
        </GradeMesesRotulos>
        <LinhaHeatmap>
          <RotulosDiasSemana>
            <div style={{ gridRow: 2 }}>Seg</div>
            <div style={{ gridRow: 4 }}>Qua</div>
            <div style={{ gridRow: 6 }}>Sex</div>
          </RotulosDiasSemana>
          <GradeCelulas style={{ gridTemplateColumns: `repeat(${heatmap.numWeeks}, 11px)` }}>
            {heatmap.cells.map((cell, i) => (
              <CelulaHeatmap
                key={i}
                $ativa={cell.active}
                title={`${cell.dateLabel}${cell.active ? " — treino concluído" : ""}`}
                style={{ gridColumn: cell.col, gridRow: cell.row }}
              />
            ))}
          </GradeCelulas>
        </LinhaHeatmap>
      </div>

      <LegendaHeatmap>
        <TextoLegenda>Menos</TextoLegenda>
        {CORES_LEGENDA.map((cor, i) => (
          <SwatchLegenda key={i} style={{ background: cor }} />
        ))}
        <TextoLegenda>Mais</TextoLegenda>
      </LegendaHeatmap>
    </CartaoHeatmap>
  );
};
