import HttpClient from "@/services/HttpClient";

export interface ISessaoConcluida {
  id: string;
  workoutId: string;
  startedAt: string;
  finishedAt: string | null;
  durationSec: number | null;
  comment: string | null;
  workout: { name: string };
}

class ProgressoService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/sessions";
  }

  async listarSessoesConcluidas() {
    return await this.httpClient.getWithAuth<ISessaoConcluida[]>(this.path);
  }
}

export default new ProgressoService();
