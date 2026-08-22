"use server";

import { cookies } from "next/headers";

import { baseApiClient, executeServerAction } from "@/shared/api";
import { signIn, SignInResponse } from "@/auth";
import { setAuthTokensToBrowserCookies } from "@/shared/lib/server";
import { Avatar } from "@/entities/avatar";

export const loginAction = async (credentials: Credentials) =>
  executeServerAction<SignInResponse>(async () => {
    const cookiesStorage = await cookies();
    const res = await baseApiClient.post<SignInResponse, Credentials>(
      "auth/login",
      credentials,
    );

    setAuthTokensToBrowserCookies(cookiesStorage, {
      accessToken: res.data?.accessToken,
      refreshToken: res.responseCookies?.getShortValues()[0],
    });

    if (res.data) {
      let authUser = null;
      let authAvatar: Avatar | null = null;
      if (res.data.user) {
        const { avatar, ...restUser } = res.data.user;
        authAvatar = avatar;
        authUser = restUser;
      }

      await signIn("credentials", {
        user: authUser ? JSON.stringify(authUser) : null,
        avatar: authAvatar ? JSON.stringify(authAvatar) : null,
        authCredentials: JSON.stringify(res.data.authCredentials),
        onboardingStep: res.data.onboardingStep,
        redirect: false,
      });
    }

    return res.data;
  });

type Credentials = { email: string; password: string };
