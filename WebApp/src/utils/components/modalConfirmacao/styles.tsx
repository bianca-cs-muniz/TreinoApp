"use client";
import { Box, Typography, styled } from "@mui/material";

export const SobreposicaoConfirmacao = styled(Box)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 60;
`;

export const CartaoConfirmacao = styled(Box)`
  width: 100%;
  max-width: 320px;
  background: #181b21;
  border: 1px solid #2e333c;
  border-radius: 16px;
  padding: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
`;

export const TituloConfirmacao = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  color: #edeae3;
  letter-spacing: 0.5px;
`;

export const MensagemConfirmacao = styled(Typography)`
  font-size: 13px;
  color: #9a9890;
  line-height: 1.5;
`;

export const LinhaBotoesConfirmacao = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
`;

export const BotaoConfirmarExclusao = styled("button")`
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: none;
  background: #d64545;
  color: #edeae3;
  font-size: 14px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const BotaoCancelarConfirmacao = styled("button")`
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #2e333c;
  background: none;
  color: #9a9890;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
