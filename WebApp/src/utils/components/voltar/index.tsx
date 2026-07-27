import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VoltarConteiner, VoltarTexto } from "./styles";

interface VoltarProps {
  to?: string;
  texto?: string;
}

export const Voltar = ({ to = "/", texto = "Voltar" }: VoltarProps) => {
  return (
    <VoltarConteiner to={to}>
      <ArrowBackIcon sx={{ fontSize: 16, color: "#FF5A36" }} />
      <VoltarTexto>{texto}</VoltarTexto>
    </VoltarConteiner>
  );
};
