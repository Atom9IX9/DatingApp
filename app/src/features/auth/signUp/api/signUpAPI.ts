import { baseAPI } from "@/shared/api";
import { Hobby } from "@/entities/user";

export const registerEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useRegisterUserDescriptionMutation } = registerEndpoint;

// Exported type alias used for typing shared data shapes.
export type RegisterUserDescriptionReqBody = {
  description: string;
  hobbies: string[];
};

// Exported type alias used for typing shared data shapes.
export type RegisterUserDescriptionResponse = {
  description: string;
  hobbies: Hobby[];
};
