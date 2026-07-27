import MuiSnackbar from "@mui/material/Snackbar";
import { AlertaSnackbar } from "./styles";

interface SnackbarProps {
  mensagem: string | null;
  tipo?: "erro" | "sucesso";
  aoFechar: () => void;
  duracaoMs?: number;
}

export const Snackbar = ({ mensagem, tipo = "erro", aoFechar, duracaoMs = 3500 }: SnackbarProps) => {
  return (
    <MuiSnackbar
      open={!!mensagem}
      autoHideDuration={duracaoMs}
      onClose={aoFechar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <AlertaSnackbar onClose={aoFechar} severity={tipo === "erro" ? "error" : "success"} variant="filled">
        {mensagem}
      </AlertaSnackbar>
    </MuiSnackbar>
  );
};
