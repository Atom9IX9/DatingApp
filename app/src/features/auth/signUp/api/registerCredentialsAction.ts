"use server";

import { cookies } from "next/headers";

import { baseApiClient } from "@/shared/api";
import { HttpError } from "@/shared/errors";
import { signIn } from "@/auth";
import { ClientOnboardingStep } from "@/shared/types";
import { setAuthTokensToBrowserCookies } from "@/shared/lib/server";

export const registerCredentialsAction = async (
  body: RegisterCredentialsReqBody,
): RegisterCredentialsActionResponse => {
  try {
    const cookiesStorage = await cookies();

    const { data, responseCookies } = await baseApiClient.post<
      RegisterCredentialsResponse,
      RegisterCredentialsReqBody
    >("auth/register/credentials", body);

    setAuthTokensToBrowserCookies(cookiesStorage, {
      accessToken: data?.accessToken,
      refreshToken: responseCookies?.getShortValues()[0],
    });

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
