import { ApiClient } from "./apiClient";

type DBPayload = {
  query: string;
  parameters: Record<string, unknown>;
};

type DBResponse = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export const createDBClient = (
  baseUrl: string,
  clientId: string,
  clientToken: string,
  appCode: string

) => {
  const apiClient = new ApiClient({
    baseUrl,
    clientId,
    clientToken,
    appCode
  });

  return {
    callDatabase: async (payload: DBPayload): Promise<DBResponse> => {
      return apiClient.post<DBResponse>(payload);
    },
  };
};