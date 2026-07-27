import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconeSeta, SelectBotao, SelectConteiner, SelectLista, SelectOpcao } from "./styles";

export interface OpcaoSelect<T extends string | number | null> {
  value: T;
  label: string;
}

interface SelectCustomizadoProps<T extends string | number | null> {
  value: T;
  onChange: (value: T) => void;
  opcoes: OpcaoSelect<T>[];
  className?: string;
}

export const SelectCustomizado = <T extends string | number | null>({
  value,
  onChange,
  opcoes,
  className,
}: SelectCustomizadoProps<T>) => {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoClicarFora = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  const selecionada = opcoes.find((o) => o.value === value);

  return (
    <SelectConteiner ref={ref} className={className}>
      <SelectBotao type="button" onClick={() => setAberto((v) => !v)}>
        {selecionada?.label ?? ""}
        <IconeSeta $aberto={aberto}>
          <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
        </IconeSeta>
      </SelectBotao>
      {aberto && (
        <SelectLista>
          {opcoes.map((o) => (
            <SelectOpcao
              key={String(o.value)}
              $selecionada={o.value === value}
              onClick={() => {
                onChange(o.value);
                setAberto(false);
              }}
            >
              {o.label}
            </SelectOpcao>
          ))}
        </SelectLista>
      )}
    </SelectConteiner>
  );
};
