import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { baseApiClient } from "@/shared/api";

import { LoginResponse } from "./features/auth/signIn/api/signInAPI";
import { refreshTokens } from "./features/auth/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await baseApiClient.post<LoginResponse, typeof credentials>(
          "auth/login",
          credentials,
        );

        const accessToken = res.data?.accessToken;
        const refreshToken = res.setCookies?.getValues()[0];
        console.log("Start refresh:::", refreshToken);

        return {
          id: res.data?.user?.uid,
          email: res.data?.authCredentials.email,
          refreshToken,
          accessToken,
          onboardingStep: res.data?.onboardingStep,
          firstName: res.data?.user?.firstName,
          lastName: res.data?.user?.lastName,
          avatar: res.data?.user?.avatar,
          sessionExpire: Date.now() + (res.data?.sessionExpire || 0) * 1000,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
          sessionExpire: user.sessionExpire,
        };
      }

      if (Date.now() < (token.sessionExpire || 0)) {
        console.log(true);
        console.log(token.refreshToken);
        return token;
      } else {
        console.log(false);
        console.log(token.refreshToken);
      }

      return refreshTokens(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
});
