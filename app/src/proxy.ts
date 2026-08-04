import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isAuthRoute, isGuestRoute } from "@/shared/config";
import { ClientOnboardingStep, ResponseOnboardingStep } from "@/shared/types";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;

  const loginUrl = new URL("/sign-in", req.nextUrl.origin);
  const homeUrl = new URL("/home", req.nextUrl.origin);
  const signUpUrl = new URL("/sign-up", req.nextUrl.origin);

  const onboardingStep =
    req.auth?.user?.onboardingStep || ClientOnboardingStep.CREDENTIALS;
  const isRegistred = onboardingStep === ResponseOnboardingStep.REGISTERED;

  if (!isRegistred && isAuthRoute(pathname)) {
    return NextResponse.redirect(loginUrl);
  }

  if (isRegistred && isGuestRoute(pathname)) {
    return NextResponse.redirect(homeUrl);
  }

  if (!isRegistred && onboardingStep !== ClientOnboardingStep.CREDENTIALS) {
    if (pathname !== "/sign-up") return NextResponse.redirect(signUpUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|scss)$).*)",
  ],
};
