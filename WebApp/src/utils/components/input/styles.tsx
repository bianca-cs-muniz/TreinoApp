"use client";
import { Box, TextField, Typography, styled } from "@mui/material";

export const CampoConteiner = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Rotulo = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  font-weight: 500;
`;

export const CampoTexto = styled(TextField)`
  & .MuiInputBase-input {
    color: #edeae3;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    padding: 13px 14px;
  }

  & .MuiOutlinedInput-root {
    background: #1d2129;
    border-radius: 10px;

    & fieldset {
      border-color: #2e333c;
    }

    &:hover fieldset {
      border-color: #2e333c;
    }

    &.Mui-focused fieldset {
      border-color: #ff5a36;
      border-width: 1px;
    }
  }
`;
