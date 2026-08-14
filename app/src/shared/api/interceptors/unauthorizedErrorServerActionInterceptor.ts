import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { setAuthTokensToBrowserCookies } from "@/shared/lib/server";

import { baseApiClient, ErrorInterceptor } from "../apiClient/apiClientBuilder";

export const unauthoriedServerActionInterceptor =
  (cookiesStorage: ReadonlyRequestCookies): ErrorInterceptor =>
  async (error, retry) => {
    const refreshToken = cookiesStorage.get("refreshToken")?.value;

    if (error.statusCode === 401 && refreshToken) {
      const refreshRes = await baseApiClient.post<
        { accessToken: string },
        undefined
      >("auth/refresh", undefined, {
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });

      setAuthTokensToBrowserCookies(cookiesStorage, {
        accessToken: refreshRes.data?.accessToken,
        refreshToken: refreshRes?.responseCookies?.getShortValues()[0],
      });

      return await retry({
        headers: {
          Authorization: `Bearer ${refreshRes.data?.accessToken}`,
        },
      });
    }

    throw error;
  };
