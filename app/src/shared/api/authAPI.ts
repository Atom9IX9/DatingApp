"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

class AuthAPI {
  cookiesStorage: ReadonlyRequestCookies;

  constructor(cookiesStorage: ReadonlyRequestCookies) {
    this.cookiesStorage = cookiesStorage;
  }

  private async fetchData<D>(endpoint: string, method: Method) {
    const accessToken = this.cookiesStorage.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      throw new Error(errorData?.message || "Auth API fetch error.");
    }

    return (await res.json()) as D;
  }

  async get<D>(endpoint: string) {
    return await this.fetchData<D>(endpoint, "GET");
  }
}

export const authAPI = async () => {
  const cookiesStorage = await cookies();
  return new AuthAPI(cookiesStorage);
};

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
