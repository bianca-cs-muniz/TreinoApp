"use client";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CabecalhoTreino = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LinhaSuperiorCabecalho = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const TituloTreino = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  color: #edeae3;
  letter-spacing: 0.5px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BotaoAlternarModo = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$ativo",
})<{ $ativo: boolean }>`
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: ${({ $ativo }) => ($ativo ? "#ff5a36" : "#9a9890")};
  white-space: nowrap;
`;

export const LinkEditarTreino = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5a36;
`;

export const CartaoCronometro = styled(Box)`
  margin-top: 14px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ValorCronometro = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 32px;
  font-weight: 700;
  color: #edeae3;
`;

export const BotaoCronometro = styled("button", {
  shouldForwardProp: (prop) => prop !== "$rodando",
})<{ $rodando: boolean }>`
  padding: 11px 18px;
  border-radius: 8px;
  border: none;
  background: ${({ $rodando }) => ($rodando ? "#2e333c" : "#ff5a36")};
  color: ${({ $rodando }) => ($rodando ? "#edeae3" : "#14171c")};
  font-size: 13px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ListaExerciciosTreino = styled(Box)`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CartaoExercicioExecucao = styled(Box)`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CabecalhoExercicioExecucao = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ImagemExercicioExecucao = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$url",
})<{ $url?: string }>`
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 8px;
  border: 1px solid #2e333c;
  background: ${({ $url }) =>
    $url
      ? `#14171c url(${$url}) center/cover no-repeat`
      : "repeating-linear-gradient(45deg, #14171c, #14171c 8px, #22262e 8px, #22262e 16px)"};
`;

export const InfoExercicioExecucao = styled(Box)`
  flex: 1;
`;

export const NomeExercicioExecucao = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
  color: #edeae3;
`;

export const RotuloDescansoExercicio = styled(Box)`
  font-size: 12px;
  color: #9a9890;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CabecalhoSeriesExecucao = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #75797f;
  padding: 0 2px;
`;

export const ColunaSerieTitulo = styled(Box)`
  width: 56px;
  flex-shrink: 0;
`;

export const ColunaPesoRepTitulo = styled(Box)`
  flex: 1;
`;

export const ListaSeriesExecucao = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinhaSerieExecucao = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RotuloSerieExecucao = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$esmaecido",
})<{ $esmaecido: boolean }>`
  font-size: 12px;
  color: #9a9890;
  width: 56px;
  flex-shrink: 0;
  opacity: ${({ $esmaecido }) => ($esmaecido ? 0.5 : 1)};
`;

export const CampoEdicaoSerie = styled("input")`
  width: 60px;
  flex-shrink: 0;
  background: #22262e;
  border: 1px solid #2e333c;
  border-radius: 8px;
  padding: 9px;
  color: #edeae3;
  font-size: 13px;
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  box-sizing: border-box;
`;

export const RotuloUnidadeSerie = styled(Typography)`
  font-size: 11px;
  color: #75797f;
  flex: 1;
`;

export const ValorSerieLeitura = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$esmaecido",
})<{ $esmaecido: boolean }>`
  flex: 1;
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  color: #9a9890;
  font-weight: 600;
  opacity: ${({ $esmaecido }) => ($esmaecido ? 0.5 : 1)};
`;

export const BotaoConcluirSerie = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$concluida",
})<{ $concluida: boolean }>`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 10px;
  border: 2px solid ${({ $concluida }) => ($concluida ? "#00c853" : "#2e333c")};
  background: ${({ $concluida }) => ($concluida ? "#00c853" : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// fixo na tela (não precisa rolar até o fim da lista de exercícios pra ver
// o cronômetro/descanso/botão) — respeita a área segura do iPhone embaixo.
export const RodapeFixoExecucao = styled(Box)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  background: #181b21;
  border-top: 1px solid #2e333c;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
  z-index: 30;
`;

export const RodapeFixoConteudo = styled(Box)`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CartaoDescanso = styled(Box)`
  background: #14171c;
  border: 1px solid #2e333c;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinhaInferiorDescanso = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const BotaoPularDescanso = styled("button")`
  border: none;
  border-radius: 8px;
  background: #2e333c;
  color: #edeae3;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 14px;
`;

export const ValorDescanso = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 22px;
  font-weight: 700;
  color: #ff5a36;
`;

export const BarraProgressoDescanso = styled(Box)`
  width: 100%;
  height: 3px;
  background: #2e333c;
  border-radius: 2px;
  overflow: hidden;
`;

export const PreenchimentoBarraDescanso = styled(Box)`
  height: 100%;
  background: #ff5a36;
`;

export const BotaoAcaoPrincipal = styled("button")`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #ff5a36;
  color: #14171c;
  font-size: 15px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SobreposicaoModal = styled(Box)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 50;
`;

export const CartaoModalFinalizar = styled(Box)`
  width: 100%;
  max-width: 340px;
  background: #181b21;
  border: 1px solid #2e333c;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CabecalhoModalFinalizar = styled(Box)`
  text-align: center;
`;

export const TituloModalFinalizar = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 26px;
  color: #edeae3;
  letter-spacing: 0.5px;
`;

export const DuracaoModalFinalizar = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 32px;
  font-weight: 700;
  color: #ff5a36;
  margin-top: 8px;
`;

export const CampoComentario = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RotuloComentario = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  font-weight: 500;
`;

export const TextareaComentario = styled("textarea")`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 10px;
  padding: 11px 12px;
  color: #edeae3;
  font-size: 13px;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  resize: none;
  width: 100%;
`;

export const LinkCancelarModal = styled(Typography)`
  text-align: center;
  font-size: 13px;
  color: #9a9890;
  cursor: pointer;
`;

export const CarregandoTexto = styled(Typography)`
  color: #9a9890;
  font-size: 14px;
`;
