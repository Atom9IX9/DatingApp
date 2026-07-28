import { JWT } from "next-auth/jwt";

import { HttpError } from "@/shared/errors";
import { baseApiClient } from "@/shared/api";

export async function refreshTokens(token: JWT): Promise<JWT> {
  try {
    const refreshed = await baseApiClient.post<
      { accessToken: string; sessionExpire: number },
      undefined
    >("auth/refresh", undefined, {
      headers: {
        Cookie: `refreshToken=${token.refreshToken}`,
      },
    });

    return {
      ...token,
      accessToken: refreshed.data?.accessToken,
      refreshToken: refreshed.setCookies?.getValues()[0] || token.refreshToken,
      sessionExpire: Date.now() + (refreshed.data?.sessionExpire || 0) * 1000,
    };
  } catch (e) {
    return {
      ...token,
      error: e instanceof HttpError ? e.message : "RefreshAccessTokenError",
    };
  }
}
