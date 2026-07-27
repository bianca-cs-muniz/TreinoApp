import { OBJETIVOS } from "../../../cadastrar-se/components/step2";
import {
  CampoMedida,
  CampoNumero,
  CampoTexto,
  CartaoObjetivo,
  GradeMedidas,
  GradeObjetivos,
  GrupoCampo,
  ListaCampos,
  RotuloCampo,
  TituloObjetivo,
} from "../../styles";

interface FormularioPerfilProps {
  nome: string;
  setNome: (valor: string) => void;
  objetivo: string | null;
  setObjetivo: (valor: string) => void;
  idade: string;
  setIdade: (valor: string) => void;
  peso: string;
  setPeso: (valor: string) => void;
  altura: string;
  setAltura: (valor: string) => void;
}

export const FormularioPerfil = ({
  nome,
  setNome,
  objetivo,
  setObjetivo,
  idade,
  setIdade,
  peso,
  setPeso,
  altura,
  setAltura,
}: FormularioPerfilProps) => {
  return (
    <ListaCampos>
      <GrupoCampo>
        <RotuloCampo>Nome</RotuloCampo>
        <CampoTexto value={nome} onChange={(e) => setNome(e.target.value)} />
      </GrupoCampo>

      <GrupoCampo>
        <RotuloCampo>Objetivo</RotuloCampo>
        <GradeObjetivos>
          {OBJETIVOS.map((o) => {
            const selecionado = objetivo === o.value;
            return (
              <CartaoObjetivo key={o.value} $selecionado={selecionado} onClick={() => setObjetivo(o.value)}>
                <TituloObjetivo $selecionado={selecionado}>{o.title}</TituloObjetivo>
              </CartaoObjetivo>
            );
          })}
        </GradeObjetivos>
      </GrupoCampo>

      <GradeMedidas>
        <CampoMedida>
          <RotuloCampo>Idade</RotuloCampo>
          <CampoNumero type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
        </CampoMedida>
        <CampoMedida>
          <RotuloCampo>Peso (kg)</RotuloCampo>
          <CampoNumero type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
        </CampoMedida>
        <CampoMedida>
          <RotuloCampo>Altura (cm)</RotuloCampo>
          <CampoNumero type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
        </CampoMedida>
      </GradeMedidas>
    </ListaCampos>
  );
};
