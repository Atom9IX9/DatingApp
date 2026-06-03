import { User, UserAccountInfo, UserAuth } from "@/entities/user";

export type CheckAuthResponseData = {
  user: UserAccountInfo | null;
  authCredentials: UserAuth;
  onboardingStep: ResponseOnboardingStep;
};

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
export type OnboardingStep = ResponseOnboardingStep | ClientOnboardingStep;