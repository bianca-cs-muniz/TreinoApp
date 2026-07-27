import {
  CabecalhoCartaoProgresso,
  CartaoProgresso,
  CelulaHeatmapMini,
  GradeHeatmapMini,
  SubtituloProgresso,
  TituloCartao,
} from "../../styles";

interface CartaoProgressoMainProps {
  onClick: () => void;
  diasEsteMes: number;
  diasHeatmap: boolean[];
}

export const CartaoProgressoMain = ({ onClick, diasEsteMes, diasHeatmap }: CartaoProgressoMainProps) => {
  return (
    <CartaoProgresso onClick={onClick}>
      <CabecalhoCartaoProgresso>
        <TituloCartao>Meu progresso</TituloCartao>
        <SubtituloProgresso>{diasEsteMes} dias este mês</SubtituloProgresso>
      </CabecalhoCartaoProgresso>
      <GradeHeatmapMini>
        {diasHeatmap.map((ativo, i) => (
          <CelulaHeatmapMini key={i} $ativa={ativo} />
        ))}
      </GradeHeatmapMini>
    </CartaoProgresso>
  );
};
