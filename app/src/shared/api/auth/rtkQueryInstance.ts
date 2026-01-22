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
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }) as BaseQueryFn<string | FetchArgs, unknown, AuthApiError>,
  endpoints: () => ({}),
});

