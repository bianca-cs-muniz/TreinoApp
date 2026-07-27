import {
  BotaoCancelarConfirmacao,
  BotaoConfirmarExclusao,
  CartaoConfirmacao,
  LinhaBotoesConfirmacao,
  MensagemConfirmacao,
  SobreposicaoConfirmacao,
  TituloConfirmacao,
} from "./styles";

interface ModalConfirmacaoProps {
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  confirmando?: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export const ModalConfirmacao = ({
  titulo,
  mensagem,
  textoConfirmar = "Excluir",
  textoCancelar = "Cancelar",
  confirmando = false,
  aoConfirmar,
  aoCancelar,
}: ModalConfirmacaoProps) => {
  return (
    <SobreposicaoConfirmacao onClick={() => !confirmando && aoCancelar()}>
      <CartaoConfirmacao onClick={(e) => e.stopPropagation()}>
        <TituloConfirmacao>{titulo}</TituloConfirmacao>
        <MensagemConfirmacao>{mensagem}</MensagemConfirmacao>
        <LinhaBotoesConfirmacao>
          <BotaoConfirmarExclusao onClick={aoConfirmar} disabled={confirmando}>
            {confirmando ? "Excluindo..." : textoConfirmar}
          </BotaoConfirmarExclusao>
          <BotaoCancelarConfirmacao onClick={aoCancelar} disabled={confirmando}>
            {textoCancelar}
          </BotaoCancelarConfirmacao>
        </LinhaBotoesConfirmacao>
      </CartaoConfirmacao>
    </SobreposicaoConfirmacao>
  );
};
