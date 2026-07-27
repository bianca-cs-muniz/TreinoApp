import {
  BotaoContinuar,
  BotaoVoltar,
  CartaoObjetivo,
  GradeObjetivos,
  SubtituloObjetivo,
  TituloEtapa,
  TituloObjetivo,
} from "../../styles";
import { ValorObjetivo } from "../../../../utils/funcoes/cadastro";

export const OBJETIVOS: { value: ValorObjetivo; title: string; subtitle: string }[] = [
  { value: "EMAGRECER", title: "Emagrecer", subtitle: "Perder peso e definir" },
  { value: "GANHAR_MASSA", title: "Ganhar massa", subtitle: "Aumentar massa muscular" },
  { value: "MANTER", title: "Manter forma", subtitle: "Manter o shape atual" },
  { value: "CONDICIONAMENTO", title: "Condicionamento", subtitle: "Melhorar resistência e fôlego" },
];

interface CadastroStep2Props {
  objetivo: ValorObjetivo | null;
  setObjetivo: (valor: ValorObjetivo) => void;
  valido: boolean;
  aoContinuar: () => void;
  aoVoltar: () => void;
}

export const CadastroStep2 = ({ objetivo, setObjetivo, valido, aoContinuar, aoVoltar }: CadastroStep2Props) => {
  return (
    <div>
      <TituloEtapa>Qual seu objetivo?</TituloEtapa>
      <GradeObjetivos>
        {OBJETIVOS.map((o) => {
          const selecionado = objetivo === o.value;
          return (
            <CartaoObjetivo key={o.value} $selecionado={selecionado} onClick={() => setObjetivo(o.value)}>
              <TituloObjetivo $selecionado={selecionado}>{o.title}</TituloObjetivo>
              <SubtituloObjetivo>{o.subtitle}</SubtituloObjetivo>
            </CartaoObjetivo>
          );
        })}
      </GradeObjetivos>
      <BotaoContinuar disabled={!valido} onClick={() => valido && aoContinuar()}>
        Continuar
      </BotaoContinuar>
      <BotaoVoltar variante="contorno" onClick={aoVoltar}>
        Voltar
      </BotaoVoltar>
    </div>
  );
};
