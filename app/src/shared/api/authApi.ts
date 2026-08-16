"use server";

import { cookies } from "next/headers";

import { ApiClientBuilder } from "./apiClient/apiClientBuilder";
import { unauthoriedServerActionInterceptor } from "./interceptors/unauthorizedErrorServerActionInterceptor";

export async function authApi() {
  const cookiesStorage = await cookies();
  const accessToken = cookiesStorage.get("accessToken")?.value;

  const authApiClientBuilder = new ApiClientBuilder();

  return authApiClientBuilder
    .setHeaders({
      Authorization: `Bearer ${accessToken}`,
    })
    .withErrorInterceptor(unauthoriedServerActionInterceptor(cookiesStorage))
    .build();
}
