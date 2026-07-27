"use client";
import { Box, styled } from "@mui/material";

export const SelectConteiner = styled(Box)`
  position: relative;
  display: inline-block;
`;

export const SelectBotao = styled("button")`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 8px;
  padding: 9px 12px;
  color: #edeae3;
  font-size: 13px;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: #ff5a36;
  }
`;

export const IconeSeta = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$aberto",
})<{ $aberto: boolean }>`
  display: flex;
  align-items: center;
  color: #9a9890;
  transform: rotate(${({ $aberto }) => ($aberto ? "180deg" : "0deg")});
  transition: transform 0.15s ease;
`;

export const SelectLista = styled(Box)`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SelectOpcao = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$selecionada",
})<{ $selecionada: boolean }>`
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family: "Inter", sans-serif;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ $selecionada }) => ($selecionada ? "#ff5a36" : "#edeae3")};
  background: ${({ $selecionada }) => ($selecionada ? "rgba(255,90,54,0.12)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;
