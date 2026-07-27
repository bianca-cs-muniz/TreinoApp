import { ButtonProps } from "@mui/material";
import { BotaoPrimario, BotaoContorno, BotaoFantasma } from "./styles";

type Variante = "primario" | "contorno" | "fantasma";

interface BotaoProps extends Omit<ButtonProps, "variant"> {
  variante?: Variante;
}

export const Botao = ({ variante = "primario", children, ...props }: BotaoProps) => {
  if (variante === "contorno") return <BotaoContorno {...props}>{children}</BotaoContorno>;
  if (variante === "fantasma") return <BotaoFantasma {...props}>{children}</BotaoFantasma>;
  return <BotaoPrimario {...props}>{children}</BotaoPrimario>;
};
