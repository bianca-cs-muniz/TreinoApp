import { Input } from "../../../../utils/components/input";
import { BotaoContinuar, BotaoVoltar, ListaCampos, TituloEtapa } from "../../styles";

interface CadastroStep1Props {
  nome: string;
  setNome: (valor: string) => void;
  email: string;
  setEmail: (valor: string) => void;
  senha: string;
  setSenha: (valor: string) => void;
  valido: boolean;
  aoContinuar: () => void;
  aoVoltar: () => void;
}

export const CadastroStep1 = ({
  nome,
  setNome,
  email,
  setEmail,
  senha,
  setSenha,
  valido,
  aoContinuar,
  aoVoltar,
}: CadastroStep1Props) => {
  return (
    <div>
      <TituloEtapa>Criar conta</TituloEtapa>
      <ListaCampos>
        <Input label="Nome" value={nome} onChange={setNome} placeholder="Seu nome" />
        <Input label="E-mail" type="email" value={email} onChange={setEmail} placeholder="voce@email.com" />
        <Input
          label="Senha (mín. 6 caracteres)"
          type="password"
          value={senha}
          onChange={setSenha}
          placeholder="••••••••"
        />
      </ListaCampos>
      <BotaoContinuar disabled={!valido} onClick={() => valido && aoContinuar()}>
        Continuar
      </BotaoContinuar>
      <BotaoVoltar variante="contorno" onClick={aoVoltar}>
        Voltar
      </BotaoVoltar>
    </div>
  );
};
