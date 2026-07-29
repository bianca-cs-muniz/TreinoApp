import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { CadastrarUsuarioPage } from "./components/cadastrar-se";
import { LoginPage } from "./components/login";
import { CriarTreinoPage } from "./components/treino/criar-treino";
import { EditarTreinoPage } from "./components/treino/editar-treino";
import { ComecarTreinoPage } from "./components/treino/comecar-treino";
import { ProgressoPage } from "./components/progresso";
import { PerfilImcPage } from "./components/imc";
import { MainPage } from "./components/main";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/treinos/novo" element={<CriarTreinoPage />} />
          <Route path="/treinos/:id" element={<ComecarTreinoPage />} />
          <Route path="/treinos/:id/editar" element={<EditarTreinoPage />} />
          <Route path="/perfil" element={<PerfilImcPage />} />
          <Route path="/relatorio" element={<ProgressoPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastrar-se" element={<CadastrarUsuarioPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    // o backend gratuito "dorme" depois de 15min sem uso — dispara uma chamada
    // leve assim que o app abre pra ele já começar a acordar em paralelo,
    // antes de qualquer tela realmente precisar de dados.
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/exercises/search?term=a`).catch(() => {});
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
