import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { APIResponse } from "../types";
import { HttpError } from "../errors";
import { getShortValuesFromSetCookies } from "../lib/helpers/getShortValuesFromSetCookies";

export class AuthAPI {
  private cookiesStorage: ReadonlyRequestCookies;
  private baseUrl: string;

  constructor(cookiesStorage: ReadonlyRequestCookies) {
    this.cookiesStorage = cookiesStorage;
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api" || "";
  }

  private async fetchData<D>(endpoint: string, method: Method): APIResponse<D> {
    const accessToken = this.cookiesStorage.get("accessToken")?.value;

    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData: HttpError = await res.json().catch(() => null);

      return {
        error: new HttpError(errorData.statusCode, errorData.message),
      };
    }

    return {
      data: (await res.json()) as D,
    };
  }

  async get<D>(endpoint: string) {
    return await this.fetchData<D>(endpoint, "GET");
  }
}

export class API {
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

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
