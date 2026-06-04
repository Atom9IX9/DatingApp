import { User, UserAccountInfo, UserAuth } from "@/entities/user";
import { CheckAuthResponseData } from "../../types";

export const verifyAuth: VerifyAuthFn = async (
  token?: string,
) => {
  if (!token) {
    return undefined;
  }

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
export type VerifyAuthFn = (token?: string) => Promise<VerifyAuthResponse | undefined>;
