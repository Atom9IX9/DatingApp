import { AuthApiError } from "@/shared/types";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const rtkAuthAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth/",
  }) as BaseQueryFn<string | FetchArgs, unknown, AuthApiError>,
  endpoints: () => ({}),
});

