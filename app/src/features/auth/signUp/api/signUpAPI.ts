import { rtkAuthAPI } from "@/shared/api";
import { UserGender } from "@/entities/user";

export const registerEndpoint = rtkAuthAPI.injectEndpoints({
  endpoints: (builder) => ({
    registerCredentials: builder.mutation<RegisterCredentialsResponse, RegisterCredentialsReqBody>({
      query: (body) => ({
        url: "register-credentials",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterCredentialsMutation } = registerEndpoint;

export type RegisterCredentialsReqBody = {
  email: string;
  password: string;
};

export type RegisterCredentialsResponse = {
  accessToken: string;
  auth: {
    authId: number;
    email: string;
  }
}
