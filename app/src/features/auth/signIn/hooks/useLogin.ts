import {
  QueryStatus,
  TypedUseMutationResult,
} from "@reduxjs/toolkit/query/react";
import { DataForLogin, useLoginMutation } from "../api/signInAPI";
import Cookies from "js-cookie";
import { AuthApiError } from "@/shared";
import { UserAuthResponse } from "../../types";

export const useLogin = () => {
  const [login, result] = useLoginMutation();

  const loginWithCookie = async (credentials: DataForLogin) => {
    const response = await login(credentials).unwrap();

    if (response.token) {
      Cookies.set("token", response.token, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response;
  };

  return { login: loginWithCookie, ...result };
};
