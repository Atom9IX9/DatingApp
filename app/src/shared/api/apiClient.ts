import { APIResponse } from "../types";
import { HttpError } from "../errors";
import { getShortValuesFromSetCookies } from "../lib/helpers/getShortValuesFromSetCookies";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api" || "";
  }

  private async fetchData<D>(
    endpoint: string,
    method: Method,
    options?: { body?: unknown },
  ): APIResponse<D> {
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const errorData: HttpError = await res.json().catch(() => null);

      throw new HttpError(errorData.statusCode, errorData.message);
    }

    const data = (await res.json()) as D;

    return {
      data,
      setCookies: {
        getFullValues: () => res.headers.getSetCookie(),
        getValues: () => getShortValuesFromSetCookies(res.headers),
      },
    };
  }

  async get<D>(endpoint: string) {
    return await this.fetchData<D>(endpoint, "GET");
  }

  async post<D, B>(endpoint: string, body: B) {
    return await this.fetchData<D>(endpoint, "POST", { body });
  }
}

export const baseApiClient = new ApiClient();

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
