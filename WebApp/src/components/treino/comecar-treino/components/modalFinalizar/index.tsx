import {
  BotaoAcaoPrincipal,
  CabecalhoModalFinalizar,
  CampoComentario,
  CartaoModalFinalizar,
  DuracaoModalFinalizar,
  LinkCancelarModal,
  RotuloComentario,
  SobreposicaoModal,
  TextareaComentario,
  TituloModalFinalizar,
} from "../../styles";

interface ModalFinalizarTreinoProps {
  duracaoFormatada: string;
  comentario: string;
  setComentario: (valor: string) => void;
  finalizando: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export const ModalFinalizarTreino = ({
  duracaoFormatada,
  comentario,
  setComentario,
  finalizando,
  aoConfirmar,
  aoCancelar,
}: ModalFinalizarTreinoProps) => {
  return (
    <SobreposicaoModal>
      <CartaoModalFinalizar>
        <CabecalhoModalFinalizar>
          <TituloModalFinalizar>Treino concluído!</TituloModalFinalizar>
          <DuracaoModalFinalizar>{duracaoFormatada}</DuracaoModalFinalizar>
        </CabecalhoModalFinalizar>

        <CampoComentario>
          <RotuloComentario>Comentário (opcional)</RotuloComentario>
          <TextareaComentario
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Como foi o treino?"
            rows={2}
          />
        </CampoComentario>

        <BotaoAcaoPrincipal onClick={aoConfirmar} disabled={finalizando}>
          {finalizando ? "Concluindo..." : "Concluir"}
        </BotaoAcaoPrincipal>
        <LinkCancelarModal onClick={() => !finalizando && aoCancelar()}>Cancelar</LinkCancelarModal>
      </CartaoModalFinalizar>
    </SobreposicaoModal>
  );
};
