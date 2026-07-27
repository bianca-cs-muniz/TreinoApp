import { AuthShell } from "../../../utils/components/authShell";
import { Voltar } from "../../../utils/components/voltar";
import { controllerTreino } from "./controller";
import { FormularioTreino } from "./components/formulario";

export const CriarTreinoPage = () => {
  const props = controllerTreino();

  return (
    <AuthShell>
      <div>
        <Voltar />
        <FormularioTreino {...props} />
      </div>
    </AuthShell>
  );
};
