export const refreshTokens = async (refreshToken: string) => {
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
    throw new Error("Failed to refresh token");
  }

  const data = await refresh.json();

  return {
    accessToken: data.accessToken,
    setCookies: refresh.headers.getSetCookie?.() ?? [],
  };
};