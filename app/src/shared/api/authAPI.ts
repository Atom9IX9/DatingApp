"use server";

import { cookies } from "next/headers";

class AuthAPI {
  private async fetchData(endpoint: string, method: Method) {
    const accessToken = cookies().get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return await res.json();
  }

  async get(endpoint: string) {
    return await this.fetchData(endpoint, "GET");
  }
}

export const authAPI = new AuthAPI();

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
