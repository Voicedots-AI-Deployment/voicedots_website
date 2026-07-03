type ApiClientConfig = {
  baseUrl: string;
  clientId: string;
  clientToken: string;
  appCode: string;
};

export class ApiClient {
  private baseUrl: string;
  private clientId: string;
  private clientToken: string;
  private appCode: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.clientId = config.clientId;
    this.clientToken = config.clientToken;
    this.appCode = config.appCode
  }

  async post<T>(payload: unknown): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client_id": this.clientId,
        "client_token": this.clientToken,
        "app_code": this.appCode,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    return response.json() as Promise<T>;
  }
}