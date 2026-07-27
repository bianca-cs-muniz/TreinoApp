"use client";
import { Box, styled } from "@mui/material";

export const AuthShellConteiner = styled(Box)`
  min-height: 100vh;
  width: 100%;
  background: #14171c;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
`;

export const AuthCard = styled(Box)`
  width: 100%;
  max-width: 420px;
  background: #181b21;
  border: 1px solid #2e333c;
  border-radius: 16px;
  padding: 28px 24px;
  box-sizing: border-box;
`;
