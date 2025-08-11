import { rtkAuthAPI } from "@/shared";
import { UserAuthResponse } from "../../types";
import { UserGender } from "@/entities";

export const registerEndpoint = rtkAuthAPI.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserAuthResponse, RegisterReqBody>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = registerEndpoint;

export type RegisterReqBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBd: string; //($date-time)
  gender: UserGender;
  location?: string;
  description?: string;
};

