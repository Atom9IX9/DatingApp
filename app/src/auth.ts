import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { baseApiClient } from "@/shared/api";

import { LoginResponse } from "./features/auth/signIn/api/signInAPI";
import { HttpError } from "./shared/errors";

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

        if (res.error) {
          // Invalid credentials
          throw new HttpError(res.error.statusCode, res.error.message);
        }

        const accessToken = res.data?.accessToken;
        const refreshToken = res.setCookies?.getValues()[0];

        return {
          id: res.data?.user?.uid,
          email: res.data?.authCredentials.email,
          refreshToken,
          accessToken,
          onboardingStep: res.data?.onboardingStep,
          firstName: res.data?.user?.firstName,
          lastName: res.data?.user?.lastName,
          avatar: res.data?.user?.avatar,
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
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
