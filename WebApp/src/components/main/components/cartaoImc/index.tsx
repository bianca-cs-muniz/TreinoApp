import { BmiZone } from "../../../../utils/funcoes/bmi";
import { CartaoImc, ColunaValorImc, SeloZonaImc, TituloCartao, ValorImc } from "../../styles";

interface CartaoImcMainProps {
  onClick: () => void;
  imc: number | null;
  zona: BmiZone | null;
}

export const CartaoImcMain = ({ onClick, imc, zona }: CartaoImcMainProps) => {
  return (
    <CartaoImc onClick={onClick}>
      <TituloCartao>Ver meu IMC</TituloCartao>
      <ColunaValorImc>
        {zona && <SeloZonaImc style={{ background: zona.color }}>{zona.label.toUpperCase()}</SeloZonaImc>}
        <ValorImc>{imc !== null ? imc.toFixed(1) : "—"}</ValorImc>
      </ColunaValorImc>
    </CartaoImc>
  );
};
