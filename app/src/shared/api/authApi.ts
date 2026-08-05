"use server";
import { cookies } from "next/headers";

import { baseApiClient } from "./apiClient";

export async function authApi() {
  const cookiesStorage = await cookies();
  const accessToken = cookiesStorage.get("accessToken")?.value;

  return baseApiClient.injectHeaders({
    Authorization: `Bearer ${accessToken}`,
  });
}
