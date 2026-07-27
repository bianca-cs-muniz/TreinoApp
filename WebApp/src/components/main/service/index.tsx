import HttpClient from "@/services/HttpClient";

export interface ITreinoResumo {
  id: string;
  name: string;
}

export interface ISessaoData {
  startedAt: string;
}

class MainService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/workouts";
  }

  async listarTreinos() {
    return await this.httpClient.getWithAuth<ITreinoResumo[]>(this.path);
  }

  async removerTreino(id: string) {
    return await this.httpClient.del<void>(`${this.path}/${id}`);
  }

  async listarSessoesConcluidas() {
    return await this.httpClient.getWithAuth<ISessaoData[]>("/sessions");
  }
}

export default new MainService();
