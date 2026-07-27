import { AuthShell } from "../../utils/components/authShell";
import { Step } from "../../utils/components/step";
import { controllerCadastro } from "./controller";
import { CadastroStep1 } from "./components/step1";
import { CadastroStep2 } from "./components/step2";
import { CadastroStep3 } from "./components/step3";

const ETAPAS = ["Conta", "Objetivo", "Corpo"];

export const CadastrarUsuarioPage = () => {
  const {
    etapa,
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    objetivo,
    setObjetivo,
    idade,
    setIdade,
    peso,
    setPeso,
    altura,
    setAltura,
    imcCalculado,
    enviando,
    sucesso,
    erro,
    etapa1Valida,
    etapa2Valida,
    valoresEtapa3Validos,
    imc,
    zona,
    faixaIdeal,
    caminhosZonas,
    coresZonas,
    ponteiro,
    calcularImc,
    criarConta,
    irParaLogin,
    avancarEtapa,
    voltarEtapa,
  } = controllerCadastro();

  return (
    <AuthShell>
      <div>
        <Step etapas={ETAPAS} etapaAtual={etapa} />

        {etapa === 1 && (
          <CadastroStep1
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            valido={etapa1Valida}
            aoContinuar={avancarEtapa}
            aoVoltar={irParaLogin}
          />
        )}

        {etapa === 2 && (
          <CadastroStep2
            objetivo={objetivo}
            setObjetivo={setObjetivo}
            valido={etapa2Valida}
            aoContinuar={avancarEtapa}
            aoVoltar={voltarEtapa}
          />
        )}

        {etapa === 3 && (
          <CadastroStep3
            nome={nome}
            idade={idade}
            setIdade={setIdade}
            peso={peso}
            setPeso={setPeso}
            altura={altura}
            setAltura={setAltura}
            valoresValidos={valoresEtapa3Validos}
            imcCalculado={imcCalculado}
            calcularImc={calcularImc}
            imc={imc}
            zona={zona}
            faixaIdeal={faixaIdeal}
            ponteiro={ponteiro}
            caminhosZonas={caminhosZonas}
            coresZonas={coresZonas}
            enviando={enviando}
            sucesso={sucesso}
            erro={erro}
            criarConta={criarConta}
            aoVoltar={voltarEtapa}
          />
        )}
      </div>
    </AuthShell>
  );
};
