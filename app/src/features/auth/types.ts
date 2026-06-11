
import { User, UserAccountInfo, UserAuth } from "@/entities/user";

// Exported type alias used for typing shared data shapes.
export type CheckAuthResponseData = {
  user: UserAccountInfo | null;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
};

// Exported type alias used for typing shared data shapes.
export type UserAuthResponse = {
  user: User;
  token?: string;
};

export enum ResponseOnboardingStep {
  REGISTERED = "registered",
  DESCRIPTION = 3,
  AVATAR = 4,
}
export enum ClientOnboardingStep {
  CREDENTIALS = 1,
  INFO = 2,
}
// Exported type alias used for typing shared data shapes.
export type OnboardingStep = ResponseOnboardingStep | ClientOnboardingStep;