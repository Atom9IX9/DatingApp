import { rtkAuthAPI } from "@/shared/api";
import { Sex } from "@/entities/user";

export const registerEndpoint = rtkAuthAPI.injectEndpoints({
  endpoints: (builder) => ({
    registerCredentials: builder.mutation<
      RegisterCredentialsResponse,
      RegisterCredentialsReqBody
    >({
      query: (body) => ({
        url: "register/credentials",
        method: "POST",
        body,
      }),
    }),
    registerUserPersonalInfo: builder.mutation<
      RegisterUserPersonalInfoResponse,
      RegisterUserPersonalInfoReqBody
    >({
      query: (body) => ({
        url: "register/user-personal",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterCredentialsMutation, useRegisterUserPersonalInfoMutation } = registerEndpoint;

export type RegisterCredentialsReqBody = {
  email: string;
  password: string;
};

export type RegisterCredentialsResponse = {
  accessToken: string;
  auth: {
    authId: number;
    email: string;
  };
};

export type RegisterUserPersonalInfoReqBody = {
  firstName: string;
  lastName: string;
  dateOfBD: string;
  gender: Sex;
  genderInfo?: string;
};

export type RegisterUserPersonalInfoResponse = {
  uid: string;
  authId: number;
  firstName: string;
  lastName: string;
  dateOfBD: string;
  age: number;
  gender: Sex;
  genderInfo?: string;
};
