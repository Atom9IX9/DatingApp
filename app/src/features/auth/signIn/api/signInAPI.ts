import { baseAPI } from "@/shared/api";
import { UserAuthResponse } from "../../types";

export const loginEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthResponse, DataForLogin>({
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
export type DataForLogin = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
