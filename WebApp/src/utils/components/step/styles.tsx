"use client";
import { Box, styled } from "@mui/material";

export type EstadoEtapa = "concluida" | "atual" | "pendente";

export const BarraProgresso = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 26px;
`;

export const CirculoEtapa = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$estado",
})<{ $estado: EstadoEtapa }>`
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $estado }) =>
    $estado === "concluida" ? "#4f7965" : $estado === "atual" ? "#ff5a36" : "transparent"};
  color: ${({ $estado }) => ($estado === "pendente" ? "#75797f" : "#14171c")};
  border: ${({ $estado }) => ($estado === "pendente" ? "1px solid #2e333c" : "none")};
`;

export const LinhaEtapa = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$concluida",
})<{ $concluida: boolean }>`
  height: 2px;
  flex: 1;
  background: ${({ $concluida }) => ($concluida ? "#4f7965" : "#2e333c")};
`;
