import { isAuthRoute, isGuestRoute } from "@/shared/config";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { refreshTokens } from "./features/auth";

const JWT_ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET,
);

async function tryToRefreshTokens(
  refreshToken: string,
  res: NextResponse,
): Promise<boolean> {
  try {
    const tokenData = await refreshTokens(refreshToken);

    res.cookies.set("accessToken", tokenData.accessToken);

    // Throw settin-header to browser
    if (tokenData.setCookieHeader) {
      res.headers.append("set-cookie", tokenData.setCookieHeader);
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  let accesToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  let isValidToken = false;
  let res = NextResponse.next();

  if (!accesToken && !refreshToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Middleware-side token validation
  try {
    await jwtVerify(accesToken || "", JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    });

    isValidToken = true;
  } catch (e) {
    // Token verification failed
    if (refreshToken) {
      const isRefreshed = await tryToRefreshTokens(refreshToken, res);
      isValidToken = isRefreshed;
    }
  }

  // Checking routes after token validation
  if (isGuestRoute(pathname) && isValidToken) {
    const redirectRes = NextResponse.redirect(new URL("/home", req.url));
    redirectRes.headers.set("set-cookie", res.headers.get("set-cookie") || "");
    return redirectRes;
  }

  if (isAuthRoute(pathname) && !isValidToken) {
    const redirectRes = NextResponse.redirect(new URL("/sign-in", req.url));
    redirectRes.cookies.delete("accessToken");
    redirectRes.cookies.delete("refreshToken");
    return redirectRes;
  }

  return res;
}

// Route matching configuration for the middleware.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
