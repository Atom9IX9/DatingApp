import "next-auth/jwt";
import "next-auth";

import { OnboardingStep } from "@/shared/types";
import { UserAccountInfo, UserAuth } from "@/entities/user";

declare module "next-auth" {
  interface User {
    authCredentials: UserAuth;

    accountInfo: UserAccountInfo | null;

    onboardingStep: OnboardingStep;

    error?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

export {};
