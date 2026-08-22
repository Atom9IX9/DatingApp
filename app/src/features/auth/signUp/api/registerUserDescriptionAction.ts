"use server";

import { unstable_update } from "@/auth";
import { Hobby } from "@/entities/user";
import { executeServerAction, authApi } from "@/shared/api";
import { ResponseOnboardingStep } from "@/shared/types";

export const registerUserDescriptionAction = async (
  body: RegisterUserDescriptionReqBody,
) =>
  executeServerAction<RegisterUserDescriptionResponse>(async () => {
    const api = await authApi();

    const res = await api.post<
      RegisterUserDescriptionResponse,
      RegisterUserDescriptionReqBody
    >("auth/register/user-description", body);

    if (res.data) {
      await unstable_update({
        user: {
          onboardingStep: ResponseOnboardingStep.AVATAR,
        },
      });
    }

    return res.data;
  });

export type RegisterUserDescriptionReqBody = {
  description: string;
  hobbies: string[];
};

// Exported type alias used for typing shared data shapes.
export type RegisterUserDescriptionResponse = {
  description: string;
  hobbies: Hobby[];
};
