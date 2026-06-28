import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { isAuthRoute, isGuestRoute } from "@/shared/config";
import { refreshTokens } from "@/features/auth/server";
import { fetchOnboardingStep } from "@/processes/register/server";
import { ResponseOnboardingStep } from "@/features/auth";

const JWT_ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET,
);

async function tryToRefreshTokens(
  refreshToken: string,
  res: NextResponse,
): Promise<any> {
  try {
    const tokenData = await refreshTokens(refreshToken);

    res.cookies.set("accessToken", tokenData.accessToken);

    return tokenData;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  let accesToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  let isValidToken = false;
  let res = NextResponse.next();
  let onboardingStep = req.cookies.get("onboardingStep")?.value;
  let isRegistered = onboardingStep === ResponseOnboardingStep.REGISTERED;

  if (!accesToken && !refreshToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Middleware-side token validation
  try {
    await jwtVerify(accesToken || "", JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    });

    isValidToken = true;

    if (!onboardingStep) {
      const currentStep = await fetchOnboardingStep(accesToken || "");
      onboardingStep = String(currentStep);
      if (onboardingStep === ResponseOnboardingStep.REGISTERED) {
        isRegistered = true;
      }
      res.cookies.set("onboardingStep", currentStep as string);
    }
  } catch (e) {
    // Token verification failed
    if (refreshToken) {
      const tokenData = await tryToRefreshTokens(refreshToken, res);

      if (tokenData) {
        accesToken = tokenData.accessToken;
        isValidToken = true;

        const redirectRes = NextResponse.redirect(req.nextUrl);

        redirectRes.cookies.set("accessToken", tokenData.accessToken);

        for (const c of res.cookies.getAll()) {
          redirectRes.cookies.set(c);
        }

        for (const cookie of tokenData.setCookies) {
          redirectRes.headers.append("set-cookie", cookie);
        }

        return redirectRes;
      }
    }
  }

  // Checking routes after token validation
  if (isGuestRoute(pathname) && isValidToken && isRegistered) {
    const redirectRes = NextResponse.redirect(new URL("/home", req.url));
    redirectRes.headers.set("set-cookie", res.headers.get("set-cookie") || "");
    return redirectRes;
  }

  if (isAuthRoute(pathname) && !isValidToken) {
    const redirectRes = NextResponse.redirect(new URL("/sign-in", req.url));
    redirectRes.cookies.delete("accessToken");
    redirectRes.cookies.delete("refreshToken");
    redirectRes.cookies.delete("onboardingStep");
    return redirectRes;
  }

  if (
    pathname !== "/sign-up" &&
    onboardingStep &&
    Number(onboardingStep) !== 1 &&
    !isRegistered
  ) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  return res;
}

// Route matching configuration for the middleware.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
