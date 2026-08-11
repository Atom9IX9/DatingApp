"use server";
import { cookies } from "next/headers";

import { ApiClientBuilder, baseApiClient } from "./apiClient/apiClientBuilder";

export async function authApi() {
  const cookiesStorage = await cookies();
  const accessToken = cookiesStorage.get("accessToken")?.value;
  const refreshToken = cookiesStorage.get("refreshToken")?.value;

  const authApiClientBuilder = new ApiClientBuilder();

  return authApiClientBuilder
    .setHeaders({
      Authorization: `Bearer ${accessToken}`,
    })
    .withErrorInterceptor(async (error, retry) => {
      if (error.statusCode === 401 && refreshToken) {
        const refreshRes = await baseApiClient.post<
          { accessToken: string },
          undefined
        >("auth/refresh", undefined, {
          headers: { Cookie: `refreshToken=${refreshToken}` },
        });

        cookiesStorage.set(
          "refreshToken",
          refreshRes.setCookies?.getValues()[0] as string,
          {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, //30 d
          },
        );
        cookiesStorage.set(
          "accessToken",
          refreshRes.data?.accessToken as string,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          },
        );

        return await retry({
          headers: {
            Authorization: `Bearer ${refreshRes.data?.accessToken}`,
          },
        });
      }

      throw error;
    })
    .build();
}
