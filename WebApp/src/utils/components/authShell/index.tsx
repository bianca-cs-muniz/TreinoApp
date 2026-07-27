import { ReactNode } from "react";
import { AuthCard, AuthShellConteiner } from "./styles";

interface AuthShellProps {
  children: ReactNode;
}

export const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <AuthShellConteiner>
      <AuthCard>{children}</AuthCard>
    </AuthShellConteiner>
  );
};
