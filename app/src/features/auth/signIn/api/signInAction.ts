"use server";

import { cookies } from "next/headers";

import { baseApiClient, executeServerAction } from "@/shared/api";
import { signIn, SignInResponse } from "@/auth";
import { setAuthTokensToBrowserCookies } from "@/shared/lib/server";

export const loginAction = async (credentials: Credentials) =>
  executeServerAction<SignInResponse>(async () => {
    const cookiesStorage = await cookies();
    const res = await baseApiClient.post<SignInResponse, Credentials>(
      "auth/login",
      credentials,
    );

    setAuthTokensToBrowserCookies(cookiesStorage, {
      accessToken: res.data?.accessToken,
      refreshToken: res.responseCookies?.getShortValues()[0],
    });

    if (res.data) {
      await signIn("credentials", {
        user: res.data.user ? JSON.stringify(res.data.user) : null,
        authCredentials: JSON.stringify(res.data.authCredentials),
        onboardingStep: res.data.onboardingStep,
        redirect: false,
      });
    }

    return res.data;
  });

type Credentials = { email: string; password: string };
