import "next-auth/jwt";
import "next-auth";
import { Avatar } from "@/entities/avatar";
import { OnboardingStep } from "@/processes/register";

declare module "next-auth" {
  interface User {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    error?: unknown;
    onboardingStep?: OnboardingStep;
    firstName?: string;
    lastName?: string;
    avatar?: Avatar;
    sessionExpire?: number;
  }

  interface Session {
    accessToken?: string;
    user?: User;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    error?: string;
    sessionExpire?: number;
  }
}

export {};
