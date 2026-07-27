"use client";
import { Box, Typography, styled } from "@mui/material";

export const TituloPerfil = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  color: #edeae3;
  letter-spacing: 0.5px;
  margin-top: 10px;
`;

export const CartaoGaugeImc = styled(Box)`
  margin-top: 16px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LinhaValorImc = styled(Box)`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const ValorImc = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 36px;
  font-weight: 700;
  color: #edeae3;
  line-height: 1;
`;

export const SeloZonaImc = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$cor",
})<{ $cor: string }>`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $cor }) => $cor};
  color: #14171c;
`;

export const FaixaIdealConteiner = styled(Box)`
  width: 100%;
  border-top: 1px solid #2e333c;
  padding-top: 10px;
  text-align: center;
`;

export const RotuloFaixaIdeal = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  font-weight: 500;
`;

export const ValorFaixaIdeal = styled(Typography)`
  font-family: "JetBrains Mono", monospace;
  font-size: 18px;
  font-weight: 700;
  color: #edeae3;
  margin-top: 2px;
`;

export const ListaCampos = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const GrupoCampo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RotuloCampo = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  font-weight: 500;
`;

export const CampoTexto = styled("input")`
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 10px;
  padding: 13px 14px;
  color: #edeae3;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  width: 100%;
`;

export const CampoNumero = styled(CampoTexto)`
  font-family: "JetBrains Mono", monospace;
  font-weight: 600;
`;

export const GradeObjetivos = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const CartaoObjetivo = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$selecionado",
})<{ $selecionado: boolean }>`
  background: #1d2129;
  border: 1px solid ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "#2e333c")};
  border-radius: 10px;
  padding: 12px 10px;
  cursor: pointer;
`;

export const TituloObjetivo = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$selecionado",
})<{ $selecionado: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "#edeae3")};
`;

export const GradeMedidas = styled(Box)`
  display: flex;
  gap: 12px;
`;

export const CampoMedida = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BotaoSalvar = styled("button")`
  margin-top: 22px;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #ff5a36;
  color: #14171c;
  font-size: 15px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
