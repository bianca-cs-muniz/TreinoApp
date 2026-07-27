import HttpClient from "@/services/HttpClient";
import { IUsuario } from "../../cadastrar-se/service";

export interface ILoginPayload {
  email: string,
  password: string,
}

export interface ILoginResponse {
  user: IUsuario,
  token: string,
}

class AuthService {
  httpClient;
  path: string;
  constructor() {
    this.httpClient = new HttpClient();
    this.path = "/login";
  }

  async login(data: ILoginPayload) {
    return await this.httpClient.post<ILoginResponse>(this.path, data);
  }
}

export default new AuthService();
