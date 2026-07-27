"use client";
import { Box, Typography, styled } from "@mui/material";
import { Botao } from "../../utils/components/button";

export const TituloEtapa = styled(Typography)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 32px;
  letter-spacing: 0.5px;
  color: #edeae3;
  line-height: 1;
`;

export const ListaCampos = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BotaoContinuar = styled(Botao)`
  margin-top: 24px;
`;

export const BotaoVoltar = styled(Botao)`
  margin-top: 12px;
`;

export const BotaoCriarConta = styled(Botao)`
  margin-top: 16px;
`;

export const GradeObjetivos = styled(Box)`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const CartaoObjetivo = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$selecionado",
})<{ $selecionado: boolean }>`
  background: #1d2129;
  border: 1px solid ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "#2e333c")};
  border-radius: 12px;
  padding: 16px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TituloObjetivo = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$selecionado",
})<{ $selecionado: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ $selecionado }) => ($selecionado ? "#ff5a36" : "#edeae3")};
`;

export const SubtituloObjetivo = styled(Typography)`
  font-size: 12px;
  color: #75797f;
  line-height: 1.4;
`;

export const GradeMedidas = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const CampoMedida = styled(Box)`
  flex: 1;
  min-width: 90px;

  .MuiInputBase-input {
    font-family: "JetBrains Mono", monospace;
    font-weight: 600;
  }
`;

export const CartaoResultado = styled(Box)`
  margin-top: 20px;
  background: #1d2129;
  border: 1px solid #2e333c;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const AvisoConsulta = styled(Typography)`
  font-size: 11px;
  color: #75797f;
  letter-spacing: 0.5px;
  text-align: center;
`;

export const LinhaImc = styled(Box)`
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

export const SeloZona = styled(Typography, {
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

export const MensagemSucesso = styled(Box)`
  margin-top: 16px;
  background: rgba(79, 121, 101, 0.15);
  border: 1px solid #4f7965;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
`;

export const MensagemErro = styled(Box)`
  margin-top: 16px;
  background: rgba(214, 69, 69, 0.15);
  border: 1px solid #d64545;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
`;

export const TituloMensagemSucesso = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  color: #4f7965;
`;

export const TituloMensagemErro = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  color: #d64545;
`;

export const SubtituloMensagem = styled(Typography)`
  font-size: 12px;
  color: #9a9890;
  margin-top: 4px;
`;
