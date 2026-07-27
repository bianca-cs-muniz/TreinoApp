import { Fragment } from "react";
import { BarraProgresso, CirculoEtapa, LinhaEtapa } from "./styles";

interface StepProps {
  etapas: string[];
  etapaAtual: number;
}

export const Step = ({ etapas, etapaAtual }: StepProps) => {
  return (
    <BarraProgresso>
      {etapas.map((_, indice) => {
        const numero = indice + 1;
        const estado = numero < etapaAtual ? "concluida" : numero === etapaAtual ? "atual" : "pendente";
        return (
          <Fragment key={numero}>
            <CirculoEtapa $estado={estado}>{numero < etapaAtual ? "✓" : numero}</CirculoEtapa>
            {numero < etapas.length && <LinhaEtapa $concluida={numero < etapaAtual} />}
          </Fragment>
        );
      })}
    </BarraProgresso>
  );
};
