import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const setAuthTokensToBrowserCookies = (
  cookiesStorage: ReadonlyRequestCookies,
  tokens: { accessToken?: string; refreshToken?: string },
) => {
  if (tokens.accessToken && tokens.refreshToken) {
    cookiesStorage.set("refreshToken", tokens.refreshToken, {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, //30 d
    });
    cookiesStorage.set("accessToken", tokens.accessToken as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }
};
