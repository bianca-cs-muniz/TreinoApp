"use client";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CabecalhoMain = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const SaudacaoUsuario = styled(Typography)`
  font-size: 13px;
  color: #9a9890;
`;

export const TituloMain = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  color: #edeae3;
  letter-spacing: 0.5px;
  margin-top: 2px;
`;

export const BotaoSair = styled("button")`
  padding: 9px 14px;
  border-radius: 8px;
  border: 1px solid #2e333c;
  background: none;
  color: #9a9890;
  font-size: 13px;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  white-space: nowrap;
`;

export const LinhaCartoes = styled(Box)`
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const CartaoImc = styled(Box)`
  flex: 1;
  min-width: 160px;
  background: #1d2129;
  border: 1px solid #ff5a36;
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
`;

export const TituloCartao = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  color: #edeae3;
`;

export const ColunaValorImc = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SeloZonaImc = styled(Typography)`
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 999px;
  color: #14171c;
`;

export const ValorImc = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 28px;
  font-weight: 700;
  color: #ff5a36;
`;

export const CartaoProgresso = styled(Box)`
  flex: 1;
  min-width: 160px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const CabecalhoCartaoProgresso = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SubtituloProgresso = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #9a9890;
`;

export const GradeHeatmapMini = styled(Box)`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 3px;
  width: 100%;
`;

export const CelulaHeatmapMini = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$ativa",
})<{ $ativa: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  max-width: 14px;
  border-radius: 2px;
  background: ${({ $ativa }) => ($ativa ? "#ff5a36" : "#2e333c")};
`;

export const ListaTreinos = styled(Box)`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LinkNovoTreino = styled(Box)`
  border: 1px dashed #2e333c;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  color: #ff5a36;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

export const CartaoTreino = styled(Box)`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const NomeTreino = styled(Typography)`
  font-size: 14px;
  color: #edeae3;
  font-weight: 500;
`;

export const AcoesTreino = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

export const BotaoIconeTreino = styled(Box)`
  padding: 10px;
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9a9890;

  &:hover {
    color: #edeae3;
  }
`;

export const LinkEditarTreinoItem = styled(Link)`
  padding: 10px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9a9890;

  &:hover {
    color: #edeae3;
  }
`;

export const EstadoVazio = styled(Box)`
  margin-top: 32px;
  text-align: center;
  padding: 24px 12px;
  border: 1px dashed #2e333c;
  border-radius: 12px;
`;

export const TextoEstadoVazio = styled(Typography)`
  font-size: 14px;
  color: #9a9890;
  line-height: 1.5;
`;

export const BotaoCadastrarPrimeiro = styled("button")`
  margin-top: 16px;
  padding: 13px 20px;
  border-radius: 10px;
  border: none;
  background: #ff5a36;
  color: #14171c;
  font-size: 14px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  cursor: pointer;
`;
