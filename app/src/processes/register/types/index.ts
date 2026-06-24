import { ResponseOnboardingStep } from "@/features/auth/types/types";

export enum ClientOnboardingStep {
  CREDENTIALS = 1,
  INFO = 2,
}
// Exported type alias used for typing shared data shapes.
export type OnboardingStep = ResponseOnboardingStep | ClientOnboardingStep;
