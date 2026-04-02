import { User, UserAccountInfo, UserAuth } from "@/entities/user";

//todo: axios refactor
export const verifyAuth: VerifyAuthFn = async (
  token: string,
): Promise<VerifyAuthResponse> => {
  const res = await fetch(`${process.env.API_URL}/auth`, {
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
    onboardingStep: number;
  }
