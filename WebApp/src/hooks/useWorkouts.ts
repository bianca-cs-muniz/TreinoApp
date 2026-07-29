import { useCallback, useEffect, useState } from "react";
import MainService, { ITreinoResumo } from "../components/main/service";

export function useWorkouts() {
  const [treinos, setTreinos] = useState<ITreinoResumo[]>([]);
  const [carregandoTreinos, setCarregandoTreinos] = useState(true);
  const [erroTreinos, setErroTreinos] = useState<string | null>(null);

  const buscarTreinos = useCallback(() => {
    setCarregandoTreinos(true);
    setErroTreinos(null);
    return MainService.listarTreinos()
      .then((resultado) => {
        setTreinos(resultado);
        setCarregandoTreinos(false);
      })
      .catch((err) => {
        // o backend gratuito "dorme" após 15min sem uso — a primeira chamada
        // pode falhar/demorar enquanto ele acorda. Tenta de novo uma vez antes
        // de mostrar erro de verdade.
        return MainService.listarTreinos()
          .then((resultado) => {
            setTreinos(resultado);
            setCarregandoTreinos(false);
          })
          .catch(() => {
            setErroTreinos(err?.message || "Não foi possível carregar seus treinos.");
            setCarregandoTreinos(false);
          });
      });
  }, []);

  useEffect(() => {
    buscarTreinos();
  }, [buscarTreinos]);

  async function removerTreino(id: string) {
    await MainService.removerTreino(id);
    setTreinos((prev) => prev.filter((t) => t.id !== id));
  }

  return { treinos, carregandoTreinos, erroTreinos, recarregarTreinos: buscarTreinos, removerTreino };
}
