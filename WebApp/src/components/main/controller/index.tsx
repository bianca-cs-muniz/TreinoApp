import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { calculateBmi, classifyBmi } from "../../../utils/funcoes/bmi";
import { dateKey } from "../../../utils/funcoes/heatmap";
import MainService from "../service";

export function controllerMain() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    treinos,
    carregandoTreinos,
    erroTreinos,
    recarregarTreinos,
    removerTreino: removerTreinoDoServico,
  } = useWorkouts();

  const [datasSessoes, setDatasSessoes] = useState<Set<string>>(new Set());

  useEffect(() => {
    MainService.listarSessoesConcluidas()
      .then((sessoes) => setDatasSessoes(new Set(sessoes.map((s) => dateKey(new Date(s.startedAt))))))
      .catch(console.error);
  }, []);

  const imc = user?.age && user?.weightKg && user?.heightCm ? calculateBmi(user.weightKg, user.heightCm) : null;
  const zonaImc = imc !== null ? classifyBmi(imc) : null;

  const diasHeatmap = useMemo(() => {
    const agora = new Date();
    const diasNoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).getDate();
    const dias: boolean[] = [];
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const d = new Date(agora.getFullYear(), agora.getMonth(), dia);
      dias.push(datasSessoes.has(dateKey(d)));
    }
    return dias;
  }, [datasSessoes]);

  const diasEsteMes = useMemo(() => {
    const agora = new Date();
    let contagem = 0;
    datasSessoes.forEach((chave) => {
      const d = new Date(chave);
      if (d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear()) contagem++;
    });
    return contagem;
  }, [datasSessoes]);

  function irParaNovoTreino() {
    navigate("/treinos/novo");
  }

  function abrirTreino(id: string) {
    navigate(`/treinos/${id}`);
  }

  function irParaPerfil() {
    navigate("/perfil");
  }

  function irParaProgresso() {
    navigate("/relatorio");
  }

  async function removerTreino(id: string) {
    await removerTreinoDoServico(id);
  }

  return {
    user,
    logout,
    treinos,
    carregandoTreinos,
    erroTreinos,
    recarregarTreinos,
    imc,
    zonaImc,
    diasHeatmap,
    diasEsteMes,
    irParaNovoTreino,
    abrirTreino,
    irParaPerfil,
    irParaProgresso,
    removerTreino,
  };
}
