import {
  ClientOnboardingStep,
  OnboardingStep,
  ResponseOnboardingStep,
} from "@/features/auth";

export const onboardingStepFromCookies = (step?: string) => {
  if (!step) {
    return ClientOnboardingStep.CREDENTIALS;
  }

  return step !== ResponseOnboardingStep.REGISTERED
    ? Number(step)
    : (step as OnboardingStep);
};
