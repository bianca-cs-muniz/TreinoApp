import { useEffect, useState } from "react";
import MainService, { ITreinoResumo } from "../components/main/service";

export function useWorkouts() {
  const [treinos, setTreinos] = useState<ITreinoResumo[]>([]);
  const [carregandoTreinos, setCarregandoTreinos] = useState(true);

  useEffect(() => {
    MainService.listarTreinos()
      .then(setTreinos)
      .catch(console.error)
      .finally(() => setCarregandoTreinos(false));
  }, []);

  async function removerTreino(id: string) {
    await MainService.removerTreino(id);
    setTreinos((prev) => prev.filter((t) => t.id !== id));
  }

  return { treinos, carregandoTreinos, removerTreino };
}
