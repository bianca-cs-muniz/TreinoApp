import { ISessaoConcluida } from "../../service";
import { SelectCustomizado } from "../../../../utils/components/selectCustomizado";
import {
  CabecalhoHistorico,
  ComentarioHistorico,
  CartaoHistorico,
  DataHistorico,
  DuracaoHistorico,
  ListaHistorico,
  LinhaHistorico,
  MensagemVazia,
  NomeTreinoHistorico,
  TituloHistorico,
} from "../../styles";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const OPCOES_MES = [{ value: null, label: "Todos os meses" }, ...MESES.map((label, i) => ({ value: i, label }))];

const formatarDuracao = (durationSec: number | null): string => {
  if (!durationSec) return "—";
  const min = Math.floor(durationSec / 60);
  const sec = durationSec % 60;
  return `${min}min ${String(sec).padStart(2, "0")}s`;
};

const formatarData = (iso: string): string =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

interface HistoricoTreinosProps {
  historico: ISessaoConcluida[];
  carregando: boolean;
  filtroMes: number | null;
  setFiltroMes: (valor: number | null) => void;
}

export const HistoricoTreinos = ({ historico, carregando, filtroMes, setFiltroMes }: HistoricoTreinosProps) => {
  return (
    <>
      <CabecalhoHistorico>
        <TituloHistorico>Histórico</TituloHistorico>
        <SelectCustomizado value={filtroMes} onChange={setFiltroMes} opcoes={OPCOES_MES} />
      </CabecalhoHistorico>

      <ListaHistorico>
        {!carregando && historico.length === 0 && (
          <MensagemVazia>Nenhum treino concluído neste período.</MensagemVazia>
        )}
        {historico.map((s) => (
          <CartaoHistorico key={s.id}>
            <LinhaHistorico>
              <NomeTreinoHistorico>{s.workout.name}</NomeTreinoHistorico>
              <DuracaoHistorico>{formatarDuracao(s.durationSec)}</DuracaoHistorico>
            </LinhaHistorico>
            <DataHistorico>{formatarData(s.startedAt)}</DataHistorico>
            {s.comment && <ComentarioHistorico>{s.comment}</ComentarioHistorico>}
          </CartaoHistorico>
        ))}
      </ListaHistorico>
    </>
  );
};
