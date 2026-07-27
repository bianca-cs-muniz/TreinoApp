import HttpClient from "@/services/HttpClient";

export interface ISerieTreino {
  id: string;
  weightKg: number | null;
  reps: number | null;
  durationSec: number | null;
}

export interface IExercicioTreino {
  id: string;
  name: string;
  externalApiId: string | null;
  restSec: number | null;
  sets: ISerieTreino[];
}

export interface ITreino {
  id: string;
  name: string;
  weekDay: number | null;
  exercises: IExercicioTreino[];
}

export interface ISetLogModelo {
  id: string;
  weightKg: number | null;
  reps: number | null;
  durationSec: number | null;
}

export interface ISetLog {
  id: string;
  setId: string;
  weightKg: number | null;
  reps: number | null;
  durationSec: number | null;
  completed: boolean;
  completedAt: string | null;
  set: ISetLogModelo;
}

export interface ISessaoTreino {
  id: string;
  workoutId: string;
  startedAt: string;
  finishedAt: string | null;
  durationSec: number | null;
  setLogs: ISetLog[];
}

export interface IAtualizarSetLogPayload {
  completed?: boolean;
  weightKg?: number;
  reps?: number;
  durationSec?: number;
}

export interface IExercicioDetalhes {
  id: string;
  name: string;
  images: string[];
}

class ComecarTreinoService {
  httpClient;
  constructor() {
    this.httpClient = new HttpClient();
  }

  async buscarTreino(id: string) {
    return await this.httpClient.getWithAuth<ITreino>(`/workouts/${id}`);
  }

  async buscarExercicioPorId(id: string) {
    return await this.httpClient.get<IExercicioDetalhes>(`/exercises/${id}`);
  }

  async iniciarSessao(workoutId: string) {
    return await this.httpClient.post<ISessaoTreino>(`/workouts/${workoutId}/sessions`, {});
  }

  async buscarSessaoAtiva() {
    return await this.httpClient.getWithAuth<ISessaoTreino | null>("/sessions/active");
  }

  async atualizarSetLog(sessionId: string, setLogId: string, data: IAtualizarSetLogPayload) {
    return await this.httpClient.patch<ISetLog>(`/sessions/${sessionId}/set-logs/${setLogId}`, data);
  }

  async finalizarSessao(sessionId: string, durationSec: number, comment?: string) {
    return await this.httpClient.patch<ISessaoTreino>(`/sessions/${sessionId}/finish`, { durationSec, comment });
  }
}

export default new ComecarTreinoService();
