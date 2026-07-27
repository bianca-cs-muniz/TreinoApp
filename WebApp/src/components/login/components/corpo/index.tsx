import { controllerLogin } from "../../controller";
import { Input } from "../../../../utils/components/input";
import { Botao } from "../../../../utils/components/button";
import { ErroText, FormularioConteiner, LinkCadastrar, TituloCadastrar } from "./styles";

export const CorpoLogin = () => {
  const { email, setEmail, senha, setSenha, erro, enviando, podeEnviar, enviarLogin } = controllerLogin();

  return (
    <>
    <FormularioConteiner onSubmit={enviarLogin}>

      <Input 
      label="E-mail" 
      type="email" 
      value={email} 
      onChange={setEmail} 
      placeholder="voce@email.com" 
      />

      <Input 
      label="Senha" 
      type="password" 
      value={senha} 
      onChange={setSenha} 
      placeholder="••••••••" />

      {erro && <ErroText>{erro}</ErroText>}

      <Botao 
      type="submit" 
      disabled={!podeEnviar} 
      className="Botao-entrar">
        {enviando ? "Entrando..." : "Entrar"}
      </Botao>
      
    </FormularioConteiner>

    <LinkCadastrar to="/cadastrar-se">
      <TituloCadastrar>
        Ainda não tenho conta
      </TituloCadastrar>
    </LinkCadastrar>
    
    </>
  );
};
