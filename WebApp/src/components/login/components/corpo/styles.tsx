"use client";

import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const FormularioConteiner = styled("form")`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .Botao-entrar {
    margin-top: 8px;
  }

  .Botao-cadastrar{
    width: 100%;
    margin-top: 12px;
    padding: 13px;
    border-radius: 10px;
    border: 1px solid transparent;
    background: none;
    color: #9a9890;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    text-align: center;
    }
`;

export const ErroText = styled(Typography)`
  font-size: 13px;
  color: #d64545;
  margin-top: 12px;
`;

export const LinkCadastrar = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  text-decoration: none !important;
`;

export const TituloCadastrar = styled(Typography)`
  font-size: 14px;
  color: #9a9890;
  font-family: "Inter", sans-serif;
  text-decoration: none !important;
`;
