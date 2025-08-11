import { rtkAuthAPI } from "@/shared";
import { UserAuthResponse } from "../../types";

export const loginEndpoint = rtkAuthAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthResponse, DataForLogin>({
      query: (body) => ({
        url: "login",
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
