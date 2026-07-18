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
    const errorData = await refresh.json().catch(() => null);
    console.error(
      "Failed to refresh token:",
      errorData?.message || "Unknown error",
    );

    return {
      error: {
        message: "Failed to refresh token",
        statusCode: refresh.status,
      },
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
