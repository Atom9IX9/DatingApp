import { HttpError } from "../errors";
import { APIResponse } from "../types";

export async function refreshTokens(
  refreshToken: string,
): APIResponse<RefreshTokensResponse> {
  const refresh = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    },
  );

  if (!refresh.ok) {
    const errorData: HttpError = await refresh.json().catch(() => null);

    return {
      error: new HttpError(
        refresh.status,
        errorData.message || "Failed to refresh token",
      ),
    };
  }

  const data: { accessToken: string } = await refresh.json();

  return {
    data: {
      accessToken: data.accessToken,
      refreshToken: refresh.headers.getSetCookie?.()[0] ?? [],
    },
  };
}

type RefreshTokensResponse = {
  accessToken: string;
  refreshToken: string;
};
