"use server";

import { cookies } from "next/headers";

import { baseApiClient } from "@/shared/api";
import { HttpError } from "@/shared/errors";
import { signIn } from "@/auth";
import { ClientOnboardingStep } from "@/shared/types";

export const registerCredentialsAction = async (
  body: RegisterCredentialsReqBody,
): RegisterCredentialsActionResponse => {
  try {
    const cookiesStorage = await cookies();

    const { data, setCookies } = await baseApiClient.post<
      RegisterCredentialsResponse,
      RegisterCredentialsReqBody
    >("auth/register/credentials", body);

    const accessToken = data?.accessToken;
    const refreshToken = setCookies?.getValues()[0];

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

    if (data) {
      await signIn("credentials", {
        user: null,
        authCredentials: JSON.stringify(data.auth),
        onboardingStep: ClientOnboardingStep.INFO,
        redirect: false,
      });
    }

    return { data, success: true };
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
};

export type RegisterCredentialsReqBody = {
  email: string;
  password: string;
};

export type RegisterCredentialsResponse = {
  accessToken: string;
  auth: {
    authId: number;
    email: string;
  };
};

type RegisterCredentialsActionResponse = Promise<{
  success: boolean;
  errorMessage?: string;
  data?: RegisterCredentialsResponse;
}>;
