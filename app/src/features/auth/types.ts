import { User, UserAccountInfo, UserAuth } from "@/entities/user";
import { ResponseOnboardingStep } from "@/processes/register/types";

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