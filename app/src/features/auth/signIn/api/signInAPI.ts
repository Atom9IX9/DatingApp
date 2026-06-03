import { baseAPI } from "@/shared/api";
import { CheckAuthResponseData } from "../../types";
import { SignInData } from "../types/form";

export const loginEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, SignInData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginEndpoint;
export type LoginResponse = CheckAuthResponseData & { accessToken: string };
