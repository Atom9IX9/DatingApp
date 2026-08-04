import {
  ClientOnboardingStep,
  OnboardingStep,
  ResponseOnboardingStep,
} from "@/shared/types";

export const onboardingStepFromStr = (step?: string) => {
  if (!step) {
    return ClientOnboardingStep.CREDENTIALS;
  }

  return step !== ResponseOnboardingStep.REGISTERED
    ? Number(step)
    : (step as OnboardingStep);
};
