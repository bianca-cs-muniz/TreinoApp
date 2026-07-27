import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ModalConfirmacao } from "../../../../utils/components/modalConfirmacao";
import { Snackbar } from "../../../../utils/components/snackbar";
import { ITreinoResumo } from "../../service";
import {
  AcoesTreino,
  BotaoCadastrarPrimeiro,
  BotaoIconeTreino,
  CartaoTreino,
  EstadoVazio,
  LinkEditarTreinoItem,
  LinkNovoTreino,
  ListaTreinos,
  NomeTreino,
  TextoEstadoVazio,
} from "../../styles";

interface ListaTreinosMainProps {
  treinos: ITreinoResumo[];
  aoAbrirTreino: (id: string) => void;
  aoCriarTreino: () => void;
  aoRemoverTreino: (id: string) => Promise<void>;
}

export const ListaTreinosMain = ({ treinos, aoAbrirTreino, aoCriarTreino, aoRemoverTreino }: ListaTreinosMainProps) => {
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [excluindo, setExcluindo] = useState(false);
  const [erroSnackbar, setErroSnackbar] = useState<string | null>(null);

  const treinoParaExcluir = treinos.find((t) => t.id === idParaExcluir);

  const confirmarExclusao = async () => {
    if (!idParaExcluir) return;
    setExcluindo(true);
    setErroSnackbar(null);
    try {
      await aoRemoverTreino(idParaExcluir);
      setIdParaExcluir(null);
    } catch (err: any) {
      setErroSnackbar(err?.message || "Não foi possível excluir o treino. Tente novamente.");
    } finally {
      setExcluindo(false);
    }
  };

  if (treinos.length === 0) {
    return (
      <EstadoVazio>
        <TextoEstadoVazio>Você ainda não tem treinos cadastrados.</TextoEstadoVazio>
        <BotaoCadastrarPrimeiro onClick={aoCriarTreino}>Cadastrar meu primeiro treino</BotaoCadastrarPrimeiro>
      </EstadoVazio>
    );
  }

  return (
    <>
      <ListaTreinos>
        <LinkNovoTreino onClick={aoCriarTreino}>+ Novo treino</LinkNovoTreino>
        {treinos.map((t) => (
          <CartaoTreino key={t.id} onClick={() => aoAbrirTreino(t.id)}>
            <NomeTreino>{t.name}</NomeTreino>
            <AcoesTreino>
              <LinkEditarTreinoItem to={`/treinos/${t.id}/editar`} onClick={(e) => e.stopPropagation()}>
                <EditIcon sx={{ fontSize: 18 }} />
              </LinkEditarTreinoItem>
              <BotaoIconeTreino
                onClick={(e) => {
                  e.stopPropagation();
                  setIdParaExcluir(t.id);
                }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </BotaoIconeTreino>
            </AcoesTreino>
          </CartaoTreino>
        ))}
      </ListaTreinos>

      {treinoParaExcluir && (
        <ModalConfirmacao
          titulo="Excluir treino?"
          mensagem={`Tem certeza que deseja excluir "${treinoParaExcluir.name}"? Essa ação não pode ser desfeita.`}
          confirmando={excluindo}
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setIdParaExcluir(null)}
        />
      )}

      <Snackbar mensagem={erroSnackbar} tipo="erro" aoFechar={() => setErroSnackbar(null)} />
    </>
  );
};
