import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isAuthRoute, isGuestRoute } from "@/shared/config";
import { ResponseOnboardingStep } from "@/shared/types";

export const proxy = auth((req) => {
  const loginUrl = new URL("/sign-in", req.nextUrl.origin);
  const homeUrl = new URL("/home", req.nextUrl.origin);


  const isRegistred =
    req.auth?.user?.onboardingStep === ResponseOnboardingStep.REGISTERED;
  const { pathname } = req.nextUrl;

  if (!isRegistred && isAuthRoute(pathname)) {
    return NextResponse.redirect(loginUrl);
  }

  if (isRegistred && isGuestRoute(pathname)) {
    return NextResponse.redirect(homeUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|scss)$).*)",
  ],
};
