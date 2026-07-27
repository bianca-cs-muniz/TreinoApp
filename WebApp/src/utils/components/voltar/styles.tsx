"use client";
import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const VoltarConteiner = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  width: fit-content;
`;

export const VoltarTexto = styled(Typography)`
  font-size: 13px;
  font-weight: 500;
  color: #ff5a36;
  white-space: nowrap;
`;
