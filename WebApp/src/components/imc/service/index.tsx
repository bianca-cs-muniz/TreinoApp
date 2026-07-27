import HttpClient from "@/services/HttpClient";
import { IUsuario } from "../../cadastrar-se/service";

export interface IAtualizarUsuarioPayload {
  name?: string;
  goal?: string;
  age?: number;
  weightKg?: number;
  heightCm?: number;
}

class ImcService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/usuarios";
  }

  async atualizarUsuario(id: string, data: IAtualizarUsuarioPayload) {
    return await this.httpClient.put<IUsuario>(`${this.path}/${id}`, data);
  }
}

export default new ImcService();
