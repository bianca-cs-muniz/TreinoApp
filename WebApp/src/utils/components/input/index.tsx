import { CampoConteiner, CampoTexto, Rotulo } from "./styles";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({ label, type = "text", value, onChange, placeholder, className }: InputProps) => {
  return (
    <CampoConteiner className={className}>
      <Rotulo>{label}</Rotulo>
      <CampoTexto
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
      />
    </CampoConteiner>
  );
};
