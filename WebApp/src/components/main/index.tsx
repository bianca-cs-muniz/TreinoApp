import { AuthShell } from "../../utils/components/authShell";
import { controllerMain } from "./controller";
import { CartaoImcMain } from "./components/cartaoImc";
import { CartaoProgressoMain } from "./components/cartaoProgresso";
import { ListaTreinosMain } from "./components/listaTreinos";
import {
  BotaoSair,
  BotaoTentarNovamente,
  CabecalhoMain,
  EstadoCarregandoTreinos,
  LinhaCartoes,
  SaudacaoUsuario,
  TextoCarregando,
  TextoErroTreinos,
  TituloMain,
} from "./styles";

export const MainPage = () => {
  const {
    user,
    logout,
    treinos,
    carregandoTreinos,
    erroTreinos,
    recarregarTreinos,
    imc,
    zonaImc,
    diasHeatmap,
    diasEsteMes,
    irParaNovoTreino,
    abrirTreino,
    irParaPerfil,
    irParaProgresso,
    removerTreino,
  } = controllerMain();

  return (
    <AuthShell>
      <div>
        <CabecalhoMain>
          <div>
            <SaudacaoUsuario>Olá, {user?.name}</SaudacaoUsuario>
            <TituloMain>Seus treinos</TituloMain>
          </div>
          <BotaoSair onClick={logout}>Sair</BotaoSair>
        </CabecalhoMain>

        <LinhaCartoes>
          <CartaoImcMain onClick={irParaPerfil} imc={imc} zona={zonaImc} />
          <CartaoProgressoMain onClick={irParaProgresso} diasEsteMes={diasEsteMes} diasHeatmap={diasHeatmap} />
        </LinhaCartoes>

        {carregandoTreinos && (
          <EstadoCarregandoTreinos>
            <TextoCarregando>Carregando seus treinos...</TextoCarregando>
          </EstadoCarregandoTreinos>
        )}

        {!carregandoTreinos && erroTreinos && (
          <EstadoCarregandoTreinos>
            <TextoErroTreinos>{erroTreinos}</TextoErroTreinos>
            <BotaoTentarNovamente onClick={recarregarTreinos}>Tentar novamente</BotaoTentarNovamente>
          </EstadoCarregandoTreinos>
        )}

        {!carregandoTreinos && !erroTreinos && (
          <ListaTreinosMain
            treinos={treinos}
            aoAbrirTreino={abrirTreino}
            aoCriarTreino={irParaNovoTreino}
            aoRemoverTreino={removerTreino}
          />
        )}
      </div>
    </AuthShell>
  );
};
