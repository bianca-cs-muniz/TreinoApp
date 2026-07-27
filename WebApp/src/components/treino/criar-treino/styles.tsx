"use client";
import { Box, Typography, styled } from "@mui/material";

export const CarregandoTexto = styled(Typography)`
  color: #9a9890;
  font-size: 14px;
`;

export const CampoNomeTreino = styled(Box)`
  margin-top: 18px;
`;

export const ListaDias = styled(Box)`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ChipDia = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$selecionado",
})<{ $selecionado: boolean }>`
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "#2e333c")};
  background: ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "transparent")};
  color: ${({ $selecionado }) => ($selecionado ? "#14171c" : "#9a9890")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const ListaExercicios = styled(Box)`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CartaoExercicio = styled(Box)`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CampoBusca = styled("input")`
  background: #14171c;
  border: 1px solid #2e333c;
  border-radius: 8px;
  padding: 11px 12px;
  color: #edeae3;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  width: 100%;

  &::placeholder {
    color: #75797f;
  }
`;

export const ListaSugestoes = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: #14171c;
  border: 1px solid #2e333c;
  border-radius: 8px;
  overflow: hidden;
  margin-top: -6px;
`;

export const ItemSugestao = styled(Box)`
  padding: 10px 12px;
  font-size: 13px;
  color: #edeae3;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const LinkRemoverExercicio = styled(Typography)`
  font-size: 12px;
  color: #75797f;
  cursor: pointer;
  text-align: right;
`;

export const CabecalhoExercicio = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ImagemExercicio = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$url",
})<{ $url?: string }>`
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 8px;
  border: 1px solid #2e333c;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $url }) =>
    $url
      ? `#14171c url(${$url}) center/cover no-repeat`
      : "repeating-linear-gradient(45deg, #14171c, #14171c 8px, #22262e 8px, #22262e 16px)"};
`;

export const SemFoto = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 8px;
  color: #75797f;
`;

export const NomeExercicio = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
  color: #edeae3;
  flex: 1;
`;

export const BotaoIcone = styled(Box)`
  padding: 8px;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LinhaDescanso = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RotuloDescanso = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  flex: 1;
`;

export const CabecalhoSeries = styled(Box)`
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

export const ColunaPesoTitulo = styled(Box)`
  width: 60px;
`;

export const ColunaRepeticoesTitulo = styled(Box)`
  flex: 1;
`;

export const ListaSeries = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinhaSerie = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const RotuloSerie = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  width: 56px;
  flex-shrink: 0;
`;

export const CampoPeso = styled("input")`
  width: 60px;
  flex-shrink: 0;
  background: #14171c;
  border: 1px solid #2e333c;
  border-radius: 8px;
  padding: 9px;
  color: #edeae3;
  font-size: 13px;
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: #75797f;
  }
`;

export const CampoRepeticoes = styled("input")`
  flex: 1;
  min-width: 0;
  background: #14171c;
  border: 1px solid #2e333c;
  border-radius: 8px;
  padding: 9px;
  color: #edeae3;
  font-size: 13px;
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: #75797f;
  }
`;

export const LinkAdicionarSerie = styled(Box)`
  text-align: center;
  padding: 9px;
  color: #ff5a36;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px dashed #2e333c;
  border-radius: 8px;
`;

export const LinkAdicionarExercicio = styled(Box)`
  text-align: center;
  padding: 13px;
  color: #ff5a36;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: 1px dashed #2e333c;
  border-radius: 12px;
`;

export const MensagemErro = styled(Typography)`
  margin-top: 16px;
  font-size: 13px;
  color: #d64545;
  text-align: center;
`;

export const RodapeFixo = styled(Box)`
  padding-top: 16px;
  margin-top: 22px;
`;
