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
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
