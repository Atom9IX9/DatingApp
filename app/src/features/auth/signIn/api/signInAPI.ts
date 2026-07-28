import { baseAPI } from "@/shared/api";
import { SignInResponse } from "@/auth";

import { SignInData } from "../types/form";

export const loginEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, SignInData>({
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
// Exported type alias used for typing shared data shapes.
