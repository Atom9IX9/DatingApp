"use server";

import { authAPI } from "@/shared/api";

import { CheckAuthResponseData } from "../types/types";

// Async function that validates the auth token by calling the backend.
export const verifyAuth = async (): Promise<VerifyAuthResponse> => {
  const api = await authAPI();
  const res = await api.get<CheckAuthResponseData>("auth");

  //todo del or update error on API shared level
  return { data: res, error: undefined };
};

// Exported type alias used for typing shared data shapes.
export type VerifyAuthResponse = {
  data?: CheckAuthResponseData;
  error?: {
    message: string;
    statusCode: number;
  };
};
// Exported type alias used for typing shared data shapes.
