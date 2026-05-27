import { User, UserAccountInfo, UserAuth } from "@/entities/user";

//todo: axios refactor
export const verifyAuth: VerifyAuthFn = async (
  token: string,
): Promise<VerifyAuthResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    return { data: undefined, error: await res.json() };
  }
  return { data: await res.json(), error: undefined };
};

export type VerifyAuthResponse = {
  data?: CheckAuthResponseData;
  error?: {
    message: string;
    statusCode: number;
  };
};
export type VerifyAuthFn = (token: string) => Promise<VerifyAuthResponse>;
export type CheckAuthResponseData = {
  user: UserAccountInfo;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
};

export enum ResponseOnboardingStep {
  REGISTERED = "registered",
  DESCRIPTION = 3,
  AVATAR = 4,
}
export enum ClientOnboardingStep {
  CREDENTIALS = 1,
  INFO = 2,
}
export type OnboardingStep = ResponseOnboardingStep | ClientOnboardingStep;
