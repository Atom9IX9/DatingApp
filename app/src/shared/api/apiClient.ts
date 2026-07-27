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
    options?: FetchOptions,
  ): APIResponse<D> {
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      ...options,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body:
        options?.body !== undefined ? JSON.stringify(options.body) : undefined,
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

  async post<D, B>(endpoint: string, body: B, options?: PublicOptions) {
    return await this.fetchData<D>(endpoint, "POST", {
      ...options,
      body,
    });
  }
}

export const baseApiClient = new ApiClient();

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
type PublicOptions = Omit<RequestInit, "body">;
type FetchOptions = PublicOptions & {
  body?: unknown;
};
