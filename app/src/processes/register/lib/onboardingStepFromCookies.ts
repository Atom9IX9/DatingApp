import { ClientOnboardingStep, OnboardingStep, ResponseOnboardingStep } from "../types";

export const onboardingStepFromCookies = (step?: string) => {
  if (!step) {
    return ClientOnboardingStep.CREDENTIALS;
  }

  return step !== ResponseOnboardingStep.REGISTERED
    ? Number(step)
    : (step as OnboardingStep);
};
