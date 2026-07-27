import { CabecalhoLogin } from "./components/cabecalho";
import { CorpoLogin } from "./components/corpo";
import { AuthShell } from "../../utils/components/authShell";

export const LoginPage = () => {
  return (
    <AuthShell>
      <div>
        <CabecalhoLogin />
        <CorpoLogin />
      </div>
    </AuthShell>
  );
};
