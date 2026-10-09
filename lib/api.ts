import axios, { type AxiosError } from "axios";

export class ApiError extends Error {
  status: number;
  info: unknown;

  constructor(message: string, status: number, info: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

export async function apiFetcher<T>(path: string): Promise<T> {
  return apiRequest<T>(path);
}

export async function apiRequest<T>(
  path: string,
  options: { method?: "POST" | "PUT" | "DELETE"; body?: unknown } = {}
): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: path,
      method: options.method ?? "GET",
      data: options.body,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const responseData = axiosError.response?.data;
      const message =
        responseData && typeof responseData === "object" && "message" in responseData
          ? String(responseData.message)
          : axiosError.message || "API request failed";

      throw new ApiError(message, axiosError.response?.status ?? 0, responseData);
    }

    throw error;
  }
}
