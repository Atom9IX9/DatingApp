import { UserAuthInfo, Gender } from "@/models/user.model";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth/",
  }) as BaseQueryFn<string | FetchArgs, unknown, AuthApiError>,
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
  }),
});

export const checkAuth = async (token?: string) => {
  if (!token) {
    return { errCode: 401 }
  }
  try {
    const res = await fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return { user: await res.json() };
  } catch (e: any) {
    return { errCode: e.code }
  }
};

export const { useLoginMutation } = authAPI;
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
export type AuthApiError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
