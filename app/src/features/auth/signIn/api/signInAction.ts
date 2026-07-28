"use server";

import { cookies } from "next/headers";

import { baseApiClient } from "@/shared/api";
import { HttpError } from "@/shared/errors";
import { signIn, SignInResponse } from "@/auth";

export async function loginAction(
  credentials: Credentials,
): LoginActionResponse {
  try {
    const cookiesStorage = await cookies();
    const res = await baseApiClient.post<SignInResponse, Credentials>(
      "auth/login",
      credentials,
    );

    const accessToken = res.data?.accessToken;
    const refreshToken = res.setCookies?.getValues()[0];

    if (refreshToken && accessToken) {
      cookiesStorage.set("refreshToken", refreshToken, {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, //30 d
      });
      cookiesStorage.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    if (res.data) {
      await signIn("credentials", {
        user: JSON.stringify(res.data.user),
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
      message,
    };
  }
}

type LoginActionResponse = Promise<{
  success: boolean;
  message?: string;
  data?: SignInResponse;
}>;
type Credentials = { email: string; password: string };
