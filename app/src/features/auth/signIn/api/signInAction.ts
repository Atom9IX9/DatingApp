"use server";

import { cookies } from "next/headers";

import { baseApiClient } from "@/shared/api";
import { HttpError } from "@/shared/errors";
import { signIn, SignInResponse } from "@/auth";
import { setAuthTokensToBrowserCookies } from "@/shared/lib/server";

export async function loginAction(
  credentials: Credentials,
): LoginActionResponse {
  try {
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

    return { success: true, data: res.data };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof HttpError) {
      message = error.message;
    }

    return {
      success: false,
      errorMessage: message,
    };
  }
}

type LoginActionResponse = Promise<{
  success: boolean;
  errorMessage?: string;
  data?: SignInResponse;
}>;
type Credentials = { email: string; password: string };
