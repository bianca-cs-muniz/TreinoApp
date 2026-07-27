import { CartaoMetrica, ListaMetricas, RotuloMetrica, ValorMetrica } from "../../styles";

interface MetricasProgressoProps {
  totalTreinos: number;
  diasTreinados: number;
  maiorSequencia: number;
}

export const MetricasProgresso = ({ totalTreinos, diasTreinados, maiorSequencia }: MetricasProgressoProps) => {
  const metricas = [
    { label: "Total de treinos", value: totalTreinos },
    { label: "Dias treinados (mês)", value: diasTreinados },
    { label: "Maior sequência", value: maiorSequencia },
  ];

  return (
    <ListaMetricas>
      {metricas.map((m) => (
        <CartaoMetrica key={m.label}>
          <ValorMetrica>{m.value}</ValorMetrica>
          <RotuloMetrica>{m.label}</RotuloMetrica>
        </CartaoMetrica>
      ))}
    </ListaMetricas>
  );
};
