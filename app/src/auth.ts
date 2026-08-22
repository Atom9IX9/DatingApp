import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserAccountInfo, UserAuth } from "@/entities/user";
import {
  OnboardingStep,
  ClientOnboardingStep,
  ResponseOnboardingStep,
} from "@/shared/types";
import { onboardingStepFromStr } from "@/shared/lib/server";

import { Avatar } from "./entities/avatar";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { user, authCredentials, onboardingStep, avatar } =
          credentials as Credentials;

        if (credentials) {
          return {
            accountInfo: user ? JSON.parse(user) : null,
            avatar: avatar ? JSON.parse(avatar) : null,
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
    jwt: async ({ token, account, user, trigger, session }) => {
      if (account && user) {
        return {
          ...token,
          user: {
            ...user,
            onboardingStep: onboardingStepFromStr(
              user.onboardingStep as string,
            ),
          },
        };
      }

      if (trigger === "update" && session?.user) {
        // Merge new data from the update call into the token
        token.user = { ...token.user, ...session.user };
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
  user: UserAccountInfoResponse | null;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
  sessionExpire: number;
};
type UserAccountInfoResponse = UserAccountInfo & { avatar: Avatar | null };
export type SignInResponse = CheckAuthResponseData & { accessToken: string };
type Credentials = {
  user: string | null;
  authCredentials: string;
  onboardingStep?: OnboardingStep;
  avatar: string | null;
};
