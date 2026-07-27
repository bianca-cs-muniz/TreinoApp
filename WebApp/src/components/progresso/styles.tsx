"use client";
import { Box, Typography, styled } from "@mui/material";

export const CabecalhoProgresso = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  gap: 12px;
`;

export const TituloProgresso = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  color: #edeae3;
  letter-spacing: 0.5px;
`;

export const ListaMetricas = styled(Box)`
  margin-top: 18px;
  display: flex;
  gap: 10px;
`;

export const CartaoMetrica = styled(Box)`
  flex: 1;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
`;

export const ValorMetrica = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 24px;
  font-weight: 700;
  color: #ff5a36;
`;

export const RotuloMetrica = styled(Typography)`
  font-size: 11px;
  color: #9a9890;
  margin-top: 4px;
`;

export const CartaoHeatmap = styled(Box)`
  margin-top: 18px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 16px;
  overflow-x: auto;
`;

export const GradeMesesRotulos = styled(Box)`
  margin-bottom: 4px;
  margin-left: 20px;
  display: grid;
`;

export const RotuloMes = styled(Box)`
  font-size: 10px;
  color: #9a9890;
`;

export const LinhaHeatmap = styled(Box)`
  display: flex;
  gap: 4px;
`;

export const RotulosDiasSemana = styled(Box)`
  display: grid;
  grid-template-rows: repeat(7, 11px);
  gap: 3px;
  font-size: 9px;
  color: #75797f;
  width: 16px;
`;

export const GradeCelulas = styled(Box)`
  display: grid;
  grid-template-rows: repeat(7, 11px);
  gap: 3px;
`;

export const CelulaHeatmap = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$ativa",
})<{ $ativa: boolean }>`
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: ${({ $ativa }) => ($ativa ? "#ff5a36" : "#2e333c")};
`;

export const LegendaHeatmap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 12px;
`;

export const TextoLegenda = styled("span")`
  font-size: 10px;
  color: #9a9890;
`;

export const SwatchLegenda = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 2px;
`;

export const CabecalhoHistorico = styled(Box)`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TituloHistorico = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
  color: #edeae3;
`;

export const ListaHistorico = styled(Box)`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MensagemVazia = styled(Typography)`
  font-size: 13px;
  color: #9a9890;
  text-align: center;
  padding: 20px 0;
`;

export const CartaoHistorico = styled(Box)`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LinhaHistorico = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const NomeTreinoHistorico = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  color: #edeae3;
`;

export const DuracaoHistorico = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  color: #ff5a36;
`;

export const DataHistorico = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
`;

export const ComentarioHistorico = styled(Typography)`
  font-size: 12px;
  color: #75797f;
  margin-top: 2px;
`;
