import { BmiZone, ZONE_COLORS } from "../../../../utils/funcoes/bmi";
import {
  CartaoGaugeImc,
  FaixaIdealConteiner,
  LinhaValorImc,
  RotuloFaixaIdeal,
  SeloZonaImc,
  ValorFaixaIdeal,
  ValorImc,
} from "../../styles";

interface GaugeImcProps {
  imc: number;
  zona: BmiZone;
  faixaIdeal: { min: number; max: number };
  caminhosZonas: string[];
  ponteiro: { x: number; y: number };
}

export const GaugeImc = ({ imc, zona, faixaIdeal, caminhosZonas, ponteiro }: GaugeImcProps) => {
  return (
    <CartaoGaugeImc>
      <svg viewBox="0 0 220 130" width="100%" style={{ maxWidth: 260 }}>
        {caminhosZonas.map((d, i) => (
          <path key={i} d={d} stroke={ZONE_COLORS[i]} strokeWidth={16} fill="none" strokeLinecap="butt" />
        ))}
        <circle cx={110} cy={110} r={7} fill="#EDEAE3" />
        <line x1={110} y1={110} x2={ponteiro.x} y2={ponteiro.y} stroke="#EDEAE3" strokeWidth={4} strokeLinecap="round" />
      </svg>

      <LinhaValorImc>
        <ValorImc>{imc.toFixed(1)}</ValorImc>
        <SeloZonaImc $cor={zona.color}>{zona.label.toUpperCase()}</SeloZonaImc>
      </LinhaValorImc>

      <FaixaIdealConteiner>
        <RotuloFaixaIdeal>Faixa de peso ideal</RotuloFaixaIdeal>
        <ValorFaixaIdeal>
          {faixaIdeal.min.toFixed(1)}–{faixaIdeal.max.toFixed(1)} kg
        </ValorFaixaIdeal>
      </FaixaIdealConteiner>
    </CartaoGaugeImc>
  );
};
