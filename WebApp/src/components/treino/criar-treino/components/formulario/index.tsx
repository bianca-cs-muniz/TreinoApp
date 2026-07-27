import { Input } from "../../../../../utils/components/input";
import { Botao } from "../../../../../utils/components/button";
import { controllerTreino } from "../../controller";
import { SeletorDiaSemana } from "../diaSemana";
import { CartaoExercicioTreino } from "../exercicio";
import {
  CampoNomeTreino,
  CarregandoTexto,
  LinkAdicionarExercicio,
  ListaExercicios,
  MensagemErro,
  RodapeFixo,
} from "../../styles";

type FormularioTreinoProps = ReturnType<typeof controllerTreino>;

export const FormularioTreino = ({
  nome,
  setNome,
  diaSemana,
  setDiaSemana,
  exercicios,
  salvando,
  erro,
  podeSalvar,
  carregandoEdicao,
  editando,
  atualizarExercicio,
  alterarBusca,
  selecionarSugestao,
  confirmarNomeManual,
  removerExercicio,
  adicionarExercicio,
  adicionarSerie,
  atualizarSerie,
  removerSerie,
  salvarTreino,
}: FormularioTreinoProps) => {
  if (carregandoEdicao) {
    return <CarregandoTexto>Carregando treino...</CarregandoTexto>;
  }

  return (
    <>
      <CampoNomeTreino>
        <Input label="Nome do treino" value={nome} onChange={setNome} placeholder="Ex: Treino de segunda" />
      </CampoNomeTreino>

      <SeletorDiaSemana diaSemana={diaSemana} setDiaSemana={setDiaSemana} />

      <ListaExercicios>
        {exercicios.map((ex) => (
          <CartaoExercicioTreino
            key={ex.idLocal}
            exercicio={ex}
            podeRemover={exercicios.length > 1}
            aoAlterarBusca={alterarBusca}
            aoSelecionarSugestao={selecionarSugestao}
            aoConfirmarNomeManual={confirmarNomeManual}
            aoRemover={removerExercicio}
            aoAtualizar={atualizarExercicio}
            aoAdicionarSerie={adicionarSerie}
            aoAtualizarSerie={atualizarSerie}
            aoRemoverSerie={removerSerie}
          />
        ))}

        <LinkAdicionarExercicio onClick={adicionarExercicio}>+ Adicionar exercício</LinkAdicionarExercicio>
      </ListaExercicios>

      {erro && <MensagemErro>Erro ao salvar treino. Tente novamente.</MensagemErro>}

      <RodapeFixo>
        <Botao disabled={!podeSalvar} onClick={salvarTreino}>
          {salvando ? "Salvando..." : editando ? "Salvar alterações" : "Salvar treino"}
        </Botao>
      </RodapeFixo>
    </>
  );
};
