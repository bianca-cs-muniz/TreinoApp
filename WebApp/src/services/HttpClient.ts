import LocalStorageService from "./auth/localStorage.service";

class HttpClient {
  private baseUrl: string;
  private baseUrlUpload: string;

  public localStorageService!: typeof LocalStorageService;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    this.baseUrlUpload = import.meta.env.VITE_API_URL || "http://localhost:3001";

    this.localStorageService = LocalStorageService;
  }

  private async throwResponseError(response: Response, fallback: string): Promise<never> {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error || fallback);
  }

  async getWithAuth<T>(path: string): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      headers,
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to fetch data from ${path}`);

    return response.json();
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to patch data to ${path}`);

    return response.json();
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to patch data to ${path}`);

    return response.json();
  }

  async upload<T>(path: string, body: FormData, unique: boolean): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${this.baseUrlUpload}${path}`, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to post data to ${path}`);

    return response.json();
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) await this.throwResponseError(response, `Failed to fetch data from ${path}`);

    return response.json();
  }

  async getExternal<T>(path: string): Promise<T> {
    const response = await fetch(`${path}`);

    if (!response.ok) await this.throwResponseError(response, `Failed to fetch data from ${path}`);

    return response.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to post data to ${path}`);

    return await response.json();
  }

  async del<T>(path: string): Promise<T> {
    const token = this.localStorageService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) await this.throwResponseError(response, `Failed to delete data from ${path}`);
    if (response.status === 204) return undefined as T;

    return response.json();
  }
}

export default HttpClient;
