import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserAccountInfo, UserAuth } from "@/entities/user";
import {
  OnboardingStep,
  ClientOnboardingStep,
  ResponseOnboardingStep,
} from "@/shared/types";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { user, authCredentials, onboardingStep } =
          credentials as Credentials;

        if (credentials) {
          return {
            accountInfo: user ? JSON.parse(user) : null,
            authCredentials: JSON.parse(authCredentials),
            onboardingStep: !onboardingStep
              ? ClientOnboardingStep.INFO
              : onboardingStep,
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
type Credentials = {
  user: string | null;
  authCredentials: string;
  onboardingStep?: OnboardingStep;
};
