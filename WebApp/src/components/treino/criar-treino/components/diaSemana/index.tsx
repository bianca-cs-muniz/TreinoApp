import { ChipDia, ListaDias } from "../../styles";

export const DIAS_SEMANA = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];

interface SeletorDiaSemanaProps {
  diaSemana: number | null;
  setDiaSemana: (valor: number | null) => void;
}

export const SeletorDiaSemana = ({ diaSemana, setDiaSemana }: SeletorDiaSemanaProps) => {
  return (
    <ListaDias>
      {DIAS_SEMANA.map((dia) => {
        const selecionado = diaSemana === dia.value;
        return (
          <ChipDia key={dia.value} $selecionado={selecionado} onClick={() => setDiaSemana(selecionado ? null : dia.value)}>
            {dia.label}
          </ChipDia>
        );
      })}
    </ListaDias>
  );
};
