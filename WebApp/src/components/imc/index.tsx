import { AuthShell } from "../../utils/components/authShell";
import { Voltar } from "../../utils/components/voltar";
import { controllerImc } from "./controller";
import { GaugeImc } from "./components/gaugeImc";
import { FormularioPerfil } from "./components/formularioPerfil";
import { BotaoSalvar, TituloPerfil } from "./styles";

export const PerfilImcPage = () => {
  const {
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
    salvando,
    salvo,
    imc,
    zona,
    faixaIdeal,
    caminhosZonas,
    ponteiro,
    salvar,
  } = controllerImc();

  return (
    <AuthShell>
      <div>
        <Voltar />
        <TituloPerfil>Meu perfil</TituloPerfil>

        {imc !== null && zona && faixaIdeal && ponteiro && (
          <GaugeImc imc={imc} zona={zona} faixaIdeal={faixaIdeal} caminhosZonas={caminhosZonas} ponteiro={ponteiro} />
        )}

        <FormularioPerfil
          nome={nome}
          setNome={setNome}
          objetivo={objetivo}
          setObjetivo={setObjetivo}
          idade={idade}
          setIdade={setIdade}
          peso={peso}
          setPeso={setPeso}
          altura={altura}
          setAltura={setAltura}
        />

        <BotaoSalvar onClick={salvar} disabled={salvando}>
          {salvando ? "Salvando..." : salvo ? "Salvo!" : "Salvar alterações"}
        </BotaoSalvar>
      </div>
    </AuthShell>
  );
};
