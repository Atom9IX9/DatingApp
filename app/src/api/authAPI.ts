import { UserAuthInfo, Gender } from "@/models/user.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth/" }),
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthResponse, DataForLogin>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<UserAuthResponse, RegisterReqBody>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),

    }),
    checkAuth: builder.query<UserAuthInfo, void>({
      query: () => ({
        url: "/",
        method: "GET",
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }),
    }),
  }),
});

export const { useLoginMutation, useCheckAuthQuery } = authAPI;
export type DataForLogin = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
export type RegisterReqBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBd: string; //($date-time)
  gender: Gender;
  location?: string;
  description?: string;
};
export type UserAuthResponse = {
  user: UserAuthInfo;
  token?: string;
};
