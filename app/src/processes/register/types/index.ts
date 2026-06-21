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
