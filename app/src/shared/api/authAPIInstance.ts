import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { APIResponse } from "../types";

export class AuthAPI {
  cookiesStorage: ReadonlyRequestCookies;
  baseUrl: string;

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
      const errorData = await res.json().catch(() => null);

      return {
        error: {
          message: errorData?.message || "Failed to fetch data with auth",
          statusCode: res.status,
        },
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

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
