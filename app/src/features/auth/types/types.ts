import { User, UserAccountInfo, UserAuth } from "@/entities/user";

// Exported type alias used for typing shared data shapes.
export type CheckAuthResponseData = {
  user: UserAccountInfo | null;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
};

export enum ResponseOnboardingStep {
  REGISTERED = "registered",
  DESCRIPTION = 3,
  AVATAR = 4,
}

// Exported type alias used for typing shared data shapes.
export type UserAuthResponse = {
  user: User;
  token?: string;
};
