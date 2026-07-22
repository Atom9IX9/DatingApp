import { NextResponse } from "next/server";

import { auth } from "@/auth";

import { isAuthRoute } from "./shared/config";

export const proxy = auth((req) => {
  const loginUrl = new URL("/sign-in", req.nextUrl.origin);

  const isRegistred = !!req.auth;
  const { pathname } = req.nextUrl;

  if (!isRegistred && isAuthRoute(pathname)) {
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|scss)$).*)",
  ],
};
