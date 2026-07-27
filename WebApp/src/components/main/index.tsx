import { AuthShell } from "../../utils/components/authShell";
import { controllerMain } from "./controller";
import { CartaoImcMain } from "./components/cartaoImc";
import { CartaoProgressoMain } from "./components/cartaoProgresso";
import { ListaTreinosMain } from "./components/listaTreinos";
import { BotaoSair, CabecalhoMain, LinhaCartoes, SaudacaoUsuario, TituloMain } from "./styles";

export const MainPage = () => {
  const {
    user,
    logout,
    treinos,
    carregandoTreinos,
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

        {!carregandoTreinos && (
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
