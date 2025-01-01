import User, { Gender } from "@/models/user.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth/" }),
  endpoints: (builder) => ({
    login: builder.mutation<UserAuth, LoginReqBody>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<unknown, RegisterReqBody>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body
      })
    })
  })
});

export const { useLoginMutation } = authAPI
export type LoginReqBody = {
  email: string;
  password: string;
}
export type RegisterReqBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBd: string; //($date-time)
  gender: Gender;
  location?: string;
  description?: string;
}
export type UserAuth = {
  user: User;
  token: string;
}
