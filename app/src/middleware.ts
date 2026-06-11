import { ResponseOnboardingStep, verifyAuth } from "@/features/auth";
import { isAuthRoute, isGuestRoute } from "@/shared/config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  try {
    const authResponse = await verifyAuth(token);

    if (authResponse) {
      const isRegistered =
        authResponse.data?.onboardingStep === ResponseOnboardingStep.REGISTERED;

      if (isGuestRoute(pathname) && isRegistered) {
        return NextResponse.redirect(new URL("/home", req.url));
      }

      if (isAuthRoute(pathname) && !isRegistered) {
        if (pathname !== "/sign-up") {
          return NextResponse.redirect(new URL("/sign-up", req.url));
        }
      }

      if (authResponse?.error?.statusCode === 403 && pathname !== "/sign-up") {
        return NextResponse.redirect(new URL("/sign-up", req.url));
      }

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-response-data", JSON.stringify(authResponse));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  } catch (error) {
    if (isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
