import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserAccountInfo, UserAuth } from "@/entities/user";
import {
  OnboardingStep,
  ClientOnboardingStep,
  ResponseOnboardingStep,
} from "@/shared/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (credentials) {
          return {
            accountInfo: JSON.parse(credentials.user as string),
            authCredentials: JSON.parse(credentials.authCredentials as string),
            onboardingStep: !credentials.accountInfo
              ? ClientOnboardingStep.INFO
              : (credentials.onboardingStep as OnboardingStep),
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        return {
          ...token,
          user,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
});

export type CheckAuthResponseData = {
  user: UserAccountInfo | null;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
  sessionExpire: number;
};
export type SignInResponse = CheckAuthResponseData & { accessToken: string };
