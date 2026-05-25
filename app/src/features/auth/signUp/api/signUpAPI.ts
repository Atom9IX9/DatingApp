import { baseAPI } from "@/shared/api";
import { Sex } from "@/entities/user";
import { Hobby } from "@/entities/user";

export const registerEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    registerCredentials: builder.mutation<
      RegisterCredentialsResponse,
      RegisterCredentialsReqBody
    >({
      query: (body) => ({
        url: "auth/register/credentials",
        method: "POST",
        body,
      }),
    }),
    registerUserPersonalInfo: builder.mutation<
      RegisterUserPersonalInfoResponse,
      RegisterUserPersonalInfoReqBody
    >({
      query: (body) => ({
        url: "auth/register/user-personal",
        method: "POST",
        body,
      }),
    }),
    registerUserDescription: builder.mutation<
      RegisterUserDescriptionResponse,
      RegisterUserDescriptionReqBody
    >({
      query: (body) => ({
        url: "auth/register/user-description",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterCredentialsMutation,
  useRegisterUserPersonalInfoMutation,
  useRegisterUserDescriptionMutation,
} = registerEndpoint;

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

export type RegisterUserDescriptionReqBody = {
  description: string;
  hobbies: string[];
};

export type RegisterUserDescriptionResponse = {
  description: string;
  hobbies: Hobby[];
};
