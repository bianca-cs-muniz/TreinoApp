import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";
import { AuthShell } from "../../../utils/components/authShell";
import { Snackbar } from "../../../utils/components/snackbar";
import { Voltar } from "../../../utils/components/voltar";
import { controllerComecarTreino, formatarMMSS } from "./controller";
import { ExercicioExecucaoCard } from "./components/exercicioExecucao";
import { ModalFinalizarTreino } from "./components/modalFinalizar";
import {
  BarraProgressoDescanso,
  BotaoAcaoPrincipal,
  BotaoAlternarModo,
  BotaoCronometro,
  BotaoPularDescanso,
  CabecalhoTreino,
  CarregandoTexto,
  CartaoCronometro,
  CartaoDescanso,
  LinhaInferiorDescanso,
  LinhaSuperiorCabecalho,
  LinkEditarTreino,
  ListaExerciciosTreino,
  PreenchimentoBarraDescanso,
  RodapeFixoConteudo,
  RodapeFixoExecucao,
  TituloTreino,
  ValorCronometro,
  ValorDescanso,
} from "./styles";

export const ComecarTreinoPage = () => {
  const {
    treino,
    imagens,
    sessao,
    iniciando,
    modoEdicao,
    setModoEdicao,
    segundosDecorridos,
    cronometroRodando,
    setCronometroRodando,
    descanso,
    pularDescanso,
    finalizando,
    mostrarModalFinalizar,
    setMostrarModalFinalizar,
    comentario,
    setComentario,
    erroSnackbar,
    fecharErroSnackbar,
    verificandoSessaoAtiva,
    iniciarTreino,
    alternarConcluidoSerie,
    editarSerieLog,
    confirmarFinalizacao,
  } = controllerComecarTreino();

  if (!treino) {
    return (
      <AuthShell>
        <CarregandoTexto>Carregando...</CarregandoTexto>
      </AuthShell>
    );
  }

  const setLogsPorSetId = new Map((sessao?.setLogs ?? []).map((log) => [log.setId, log]));

  return (
    <AuthShell>
      <div>
        <CabecalhoTreino>
          <LinhaSuperiorCabecalho>
            <Voltar />
            {sessao ? (
              <BotaoAlternarModo $ativo={modoEdicao} onClick={() => setModoEdicao(!modoEdicao)}>
                {modoEdicao ? "Ver" : "Editar"}
              </BotaoAlternarModo>
            ) : (
              !verificandoSessaoAtiva && (
                <LinkEditarTreino to={`/treinos/${treino.id}/editar`}>
                  <EditIcon sx={{ fontSize: 20 }} />
                </LinkEditarTreino>
              )
            )}
          </LinhaSuperiorCabecalho>
          <TituloTreino>{treino.name}</TituloTreino>
        </CabecalhoTreino>

        {sessao && (
          <CartaoCronometro>
            <ValorCronometro>{formatarMMSS(segundosDecorridos)}</ValorCronometro>
            <BotaoCronometro $rodando={cronometroRodando} onClick={() => setCronometroRodando(!cronometroRodando)}>
              {cronometroRodando ? <PauseIcon sx={{ fontSize: 18 }} /> : <PlayArrowIcon sx={{ fontSize: 18 }} />}
              {cronometroRodando ? "Pausar" : "Retomar"}
            </BotaoCronometro>
          </CartaoCronometro>
        )}

        <ListaExerciciosTreino>
          {treino.exercises.map((ex) => (
            <ExercicioExecucaoCard
              key={ex.id}
              exercicio={ex}
              imagemUrl={imagens[ex.id]}
              modoEdicao={modoEdicao}
              sessaoAtiva={!!sessao}
              setLogsPorSetId={setLogsPorSetId}
              aoAlternarConcluido={alternarConcluidoSerie}
              aoEditarSerie={editarSerieLog}
            />
          ))}
        </ListaExerciciosTreino>

        <RodapeFixoExecucao>
          <RodapeFixoConteudo>
            {descanso && (
              <CartaoDescanso>
                <BarraProgressoDescanso>
                  <PreenchimentoBarraDescanso
                    style={{ width: `${(descanso.segundosRestantes / descanso.totalSeg) * 100}%` }}
                  />
                </BarraProgressoDescanso>
                <LinhaInferiorDescanso>
                  <ValorDescanso>{formatarMMSS(descanso.segundosRestantes)}</ValorDescanso>
                  <BotaoPularDescanso onClick={pularDescanso}>Pular</BotaoPularDescanso>
                </LinhaInferiorDescanso>
              </CartaoDescanso>
            )}

            {!sessao ? (
              <BotaoAcaoPrincipal onClick={iniciarTreino} disabled={iniciando}>
                {iniciando ? "Iniciando..." : "Começar treino"}
              </BotaoAcaoPrincipal>
            ) : (
              <BotaoAcaoPrincipal onClick={() => setMostrarModalFinalizar(true)}>
                Finalizar treino
              </BotaoAcaoPrincipal>
            )}
          </RodapeFixoConteudo>
        </RodapeFixoExecucao>

        {mostrarModalFinalizar && (
          <ModalFinalizarTreino
            segundosDecorridos={segundosDecorridos}
            comentario={comentario}
            setComentario={setComentario}
            finalizando={finalizando}
            aoConfirmar={confirmarFinalizacao}
            aoCancelar={() => setMostrarModalFinalizar(false)}
          />
        )}

        <Snackbar mensagem={erroSnackbar} tipo="erro" aoFechar={fecharErroSnackbar} />
      </div>
    </AuthShell>
  );
};
