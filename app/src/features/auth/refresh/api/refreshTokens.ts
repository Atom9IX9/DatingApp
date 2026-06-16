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
    console.log(refresh.status);
    throw new Error("Failed to refresh token");
  }

  const data = await refresh.json();

  const setCookieHeader = refresh.headers.get("set-cookie");

  return { accessToken: data.accessToken, setCookieHeader };
};
