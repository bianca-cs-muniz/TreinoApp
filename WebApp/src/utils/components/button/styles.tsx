"use client";
import { Button, styled } from "@mui/material";

export const BotaoPrimario = styled(Button)`
  width: 100%;
  border-radius: 10px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  text-transform: none;
  background: #ff5a36;
  color: #14171c;

  &:hover {
    background: #ff6b4a;
  }

  &.Mui-disabled {
    background: #2e333c;
    color: #75797f;
  }
`;

export const BotaoContorno = styled(Button)`
  width: 100%;
  border-radius: 10px;
  padding: 13px;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  text-transform: none;
  border: 1px solid #2e333c;
  color: #9a9890;

  &:hover {
    border-color: #2e333c;
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const BotaoFantasma = styled(Button)`
  width: 100%;
  border-radius: 10px;
  padding: 13px;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  text-transform: none;
  color: #9a9890;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;
