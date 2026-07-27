import HttpClient from "@/services/HttpClient";

export interface ISerieTreinoPayload {
  weightKg?: number;
  reps?: number;
}

export interface IExercicioTreinoPayload {
  name: string;
  externalApiId?: string;
  restSec?: number;
  sets: ISerieTreinoPayload[];
}

export interface ICriarTreinoPayload {
  name: string;
  weekDay?: number;
  exercises: IExercicioTreinoPayload[];
}

export interface ISugestaoExercicio {
  id: string;
  name: string;
}

export interface IExercicioDetalhes {
  id: string;
  name: string;
  images: string[];
}

export interface ISerieTreinoExistente {
  id: string;
  weightKg: number | null;
  reps: number | null;
}

export interface IExercicioTreinoExistente {
  id: string;
  name: string;
  externalApiId: string | null;
  restSec: number | null;
  sets: ISerieTreinoExistente[];
}

export interface ITreinoExistente {
  id: string;
  name: string;
  weekDay: number | null;
  exercises: IExercicioTreinoExistente[];
}

class TreinoService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/workouts";
  }

  async criarTreino(data: ICriarTreinoPayload) {
    return await this.httpClient.post<{ id: string }>(this.path, data);
  }

  async buscarTreinoPorId(id: string) {
    return await this.httpClient.getWithAuth<ITreinoExistente>(`${this.path}/${id}`);
  }

  async atualizarTreino(id: string, data: ICriarTreinoPayload) {
    return await this.httpClient.put<{ id: string }>(`${this.path}/${id}`, data);
  }

  async buscarExercicios(termo: string) {
    return await this.httpClient.get<ISugestaoExercicio[]>(`/exercises/search?term=${encodeURIComponent(termo)}`);
  }

  async buscarExercicioPorId(id: string) {
    return await this.httpClient.get<IExercicioDetalhes>(`/exercises/${id}`);
  }
}

export default new TreinoService();
