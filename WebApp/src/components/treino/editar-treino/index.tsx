import { useParams } from "react-router-dom";
import { AuthShell } from "../../../utils/components/authShell";
import { Voltar } from "../../../utils/components/voltar";
import { controllerTreino } from "../criar-treino/controller";
import { FormularioTreino } from "../criar-treino/components/formulario";

export const EditarTreinoPage = () => {
  const { id } = useParams();
  const props = controllerTreino(id);

  return (
    <AuthShell>
      <div>
        <Voltar to={`/treinos/${id}`} />
        <FormularioTreino {...props} />
      </div>
    </AuthShell>
  );
};
