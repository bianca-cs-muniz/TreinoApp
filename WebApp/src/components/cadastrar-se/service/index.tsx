import HttpClient from "@/services/HttpClient";

export interface IUsuario {
  id: string,
  name: string,
  email: string,
  goal?: string,
  age?: number,
  weightKg?: number,
  heightCm?: number,
}

export interface ICriarUsuarioPayload {
  name: string,
  email: string,
  password: string,
  goal?: string,
  age?: number,
  weightKg?: number,
  heightCm?: number,
}

export interface ICriarUsuarioResponse {
  user: IUsuario,
  token: string,
}

class UsuariosService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/usuarios";
  }

  async criarUsuario(data: ICriarUsuarioPayload) {
    return await this.httpClient.post<ICriarUsuarioResponse>(
      this.path,
      data
    );
  }
}
export default new UsuariosService();
