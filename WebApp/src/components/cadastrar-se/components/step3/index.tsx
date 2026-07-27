import { BmiZone } from "../../../../utils/funcoes/bmi";
import { Input } from "../../../../utils/components/input";
import {
  AvisoConsulta,
  BotaoContinuar,
  BotaoCriarConta,
  BotaoVoltar,
  CampoMedida,
  CartaoResultado,
  FaixaIdealConteiner,
  GradeMedidas,
  LinhaImc,
  MensagemErro,
  MensagemSucesso,
  RotuloFaixaIdeal,
  SeloZona,
  SubtituloMensagem,
  TituloEtapa,
  TituloMensagemErro,
  TituloMensagemSucesso,
  ValorFaixaIdeal,
  ValorImc,
} from "../../styles";

interface CadastroStep3Props {
  nome: string;
  idade: string;
  setIdade: (valor: string) => void;
  peso: string;
  setPeso: (valor: string) => void;
  altura: string;
  setAltura: (valor: string) => void;
  valoresValidos: boolean;
  imcCalculado: boolean;
  calcularImc: () => void;
  imc: number | null;
  zona: BmiZone | null;
  faixaIdeal: { min: number; max: number } | null;
  ponteiro: { x: number; y: number } | null;
  caminhosZonas: string[];
  coresZonas: string[];
  enviando: boolean;
  sucesso: boolean;
  erro: boolean;
  criarConta: () => void;
  aoVoltar: () => void;
}

export const CadastroStep3 = ({
  nome,
  idade,
  setIdade,
  peso,
  setPeso,
  altura,
  setAltura,
  valoresValidos,
  imcCalculado,
  calcularImc,
  imc,
  zona,
  faixaIdeal,
  ponteiro,
  caminhosZonas,
  coresZonas,
  enviando,
  sucesso,
  erro,
  criarConta,
  aoVoltar,
}: CadastroStep3Props) => {
  return (
    <div>
      <TituloEtapa>Seu corpo hoje</TituloEtapa>
      <GradeMedidas>
        <CampoMedida>
          <Input label="Idade" type="number" value={idade} onChange={setIdade} placeholder="25" />
        </CampoMedida>
        <CampoMedida>
          <Input label="Peso (kg)" type="number" value={peso} onChange={setPeso} placeholder="70" />
        </CampoMedida>
        <CampoMedida>
          <Input label="Altura (cm)" type="number" value={altura} onChange={setAltura} placeholder="175" />
        </CampoMedida>
      </GradeMedidas>

      <BotaoContinuar disabled={!valoresValidos} onClick={calcularImc}>
        {imcCalculado ? "Recalcular" : "Calcular IMC"}
      </BotaoContinuar>

      {imc !== null && zona && faixaIdeal && ponteiro && (
        <div>
          <CartaoResultado>
            <AvisoConsulta>SÓ CONSULTA · EDITE OS CAMPOS ACIMA A QUALQUER MOMENTO</AvisoConsulta>
            <svg viewBox="0 0 220 130" width="100%" style={{ maxWidth: 260 }}>
              {caminhosZonas.map((d, i) => (
                <path key={i} d={d} stroke={coresZonas[i]} strokeWidth={16} fill="none" strokeLinecap="butt" />
              ))}
              <circle cx={110} cy={110} r={7} fill="#EDEAE3" />
              <line x1={110} y1={110} x2={ponteiro.x} y2={ponteiro.y} stroke="#EDEAE3" strokeWidth={4} strokeLinecap="round" />
            </svg>
            <LinhaImc>
              <ValorImc>{imc.toFixed(1)}</ValorImc>
              <SeloZona $cor={zona.color}>{zona.label.toUpperCase()}</SeloZona>
            </LinhaImc>
            <FaixaIdealConteiner>
              <RotuloFaixaIdeal>Faixa de peso ideal</RotuloFaixaIdeal>
              <ValorFaixaIdeal>
                {faixaIdeal.min.toFixed(1)}–{faixaIdeal.max.toFixed(1)} kg
              </ValorFaixaIdeal>
            </FaixaIdealConteiner>
          </CartaoResultado>

          {sucesso && (
            <MensagemSucesso>
              <TituloMensagemSucesso>Conta criada com sucesso!</TituloMensagemSucesso>
              <SubtituloMensagem>Bora treinar, {nome}.</SubtituloMensagem>
            </MensagemSucesso>
          )}
          {erro && (
            <MensagemErro>
              <TituloMensagemErro>Erro ao criar conta</TituloMensagemErro>
              <SubtituloMensagem>Algo deu errado. Tente novamente.</SubtituloMensagem>
            </MensagemErro>
          )}

          <BotaoCriarConta disabled={enviando || sucesso} onClick={criarConta}>
            {enviando ? "Criando..." : sucesso ? "Conta criada" : "Criar conta"}
          </BotaoCriarConta>
        </div>
      )}

      <BotaoVoltar variante="contorno" onClick={aoVoltar}>
        Voltar
      </BotaoVoltar>
    </div>
  );
};
