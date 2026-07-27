import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AuthService from "../service";

export function controllerLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const podeEnviar = email.trim().length > 0 && senha.length > 0 && !enviando;

  async function enviarLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;

    setErro("");
    setEnviando(true);
    try {
      const { user, token } = await AuthService.login({ email, password: senha });
      login(user, token);
      navigate("/");
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return { email, setEmail, senha, setSenha, erro, enviando, podeEnviar, enviarLogin };
}
