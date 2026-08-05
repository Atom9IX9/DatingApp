"use server";

import { unstable_update } from "@/auth";
import { Sex } from "@/entities/user";
import { authApi } from "@/shared/api";
import { ResponseOnboardingStep } from "@/shared/types";

export const registerPersonalInfoAction = async (
  payload: RegisterUserPersonalInfoReqBody,
): RegisterPersonalInfoActionResponse => {
  try {
    const api = await authApi();

    const res = await api.post<
      RegisterUserPersonalInfoResponse,
      RegisterUserPersonalInfoReqBody
    >("auth/register/user-personal", payload);

    if (res.data) {
      await unstable_update({
        user: {
          onboardingStep: ResponseOnboardingStep.DESCRIPTION,
          accountInfo: {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            uid: res.data.uid,
          },
        },
      });
    }

    return { success: true, data: res.data };
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      errorMessage: message,
    };
  }
};

export type RegisterUserPersonalInfoResponse = {
  uid: string;
  authId: number;
  firstName: string;
  lastName: string;
  dateOfBD: string;
  age: number;
  gender: Sex;
  genderInfo?: string;
};

export type RegisterUserPersonalInfoReqBody = {
  firstName: string;
  lastName: string;
  dateOfBD: string;
  gender: Sex;
  genderInfo?: string;
};

type RegisterPersonalInfoActionResponse = Promise<{
  success: boolean;
  errorMessage?: string;
  data?: RegisterUserPersonalInfoResponse;
}>;
