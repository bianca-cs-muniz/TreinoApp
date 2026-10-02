import { useState } from "react";
import {
  BotaoAcaoPrincipal,
  CabecalhoModalFinalizar,
  CampoComentario,
  CartaoModalFinalizar,
  LinkCancelarModal,
  RotuloComentario,
  SobreposicaoModal,
  TextareaComentario,
  TituloModalFinalizar,
} from "../../styles";

interface ModalFinalizarTreinoProps {
  segundosDecorridos: number;
  comentario: string;
  setComentario: (valor: string) => void;
  finalizando: boolean;
  aoConfirmar: (segundosAjustados: number) => void;
  aoCancelar: () => void;
}

function parseMMSS(texto: string): number | null {
  const match = texto.match(/^(\d+):(\d{2})$/);
  if (!match) return null;
  const minutos = parseInt(match[1], 10);
  const segundos = parseInt(match[2], 10);
  if (segundos > 59) return null;
  return minutos * 60 + segundos;
}

function formatarMMSS(totalSegundos: number): string {
  const m = Math.floor(totalSegundos / 60);
  const s = totalSegundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const ModalFinalizarTreino = ({
  segundosDecorridos,
  comentario,
  setComentario,
  finalizando,
  aoConfirmar,
  aoCancelar,
}: ModalFinalizarTreinoProps) => {
  const [tempoEditado, setTempoEditado] = useState(formatarMMSS(segundosDecorridos));
  const [erroTempo, setErroTempo] = useState(false);

  function handleConfirmar() {
    const segundosAjustados = parseMMSS(tempoEditado);
    if (segundosAjustados === null) {
      setErroTempo(true);
      return;
    }
    aoConfirmar(segundosAjustados);
  }

  return (
    <SobreposicaoModal>
      <CartaoModalFinalizar>
        <CabecalhoModalFinalizar>
          <TituloModalFinalizar>Treino concluído!</TituloModalFinalizar>
          <input
            type="text"
            value={tempoEditado}
            onChange={(e) => {
              setTempoEditado(e.target.value);
              setErroTempo(false);
            }}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: erroTempo ? "2px solid #d64545" : "2px solid rgba(255,90,54,0.3)",
              outline: "none",
              textAlign: "center",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 32,
              fontWeight: 700,
              color: "#ff5a36",
              width: "100%",
              marginTop: 8,
              padding: "4px 0",
              cursor: "text",
              transition: "border-color 0.2s",
            }}
            title="Editar duração (formato M:SS)"
          />
          {erroTempo && (
            <div style={{ fontSize: 11, color: "#d64545", marginTop: 4, textAlign: "center" }}>
              Formato inválido. Use M:SS (ex: 45:30)
            </div>
          )}

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

        <BotaoAcaoPrincipal onClick={handleConfirmar} disabled={finalizando}>
          {finalizando ? "Concluindo..." : "Concluir"}
        </BotaoAcaoPrincipal>
        <LinkCancelarModal onClick={() => !finalizando && aoCancelar()}>Cancelar</LinkCancelarModal>
      </CartaoModalFinalizar>
    </SobreposicaoModal>
  );
};
