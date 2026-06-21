import { ClientOnboardingStep, OnboardingStep, ResponseOnboardingStep } from "@/processes/register/types";

export const fetchOnboardingStep: FetchOnboardingStep = async (accessToken) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/onboarding`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      return ClientOnboardingStep.CREDENTIALS
    } else if (res.status === 403) {
      return ClientOnboardingStep.INFO
    }
  }

  const data: FetchOnboardingResponse = await res.json();

  return data.onboardingStep;
};

type FetchOnboardingStep = (accessToken: string) => Promise<OnboardingStep>
type FetchOnboardingResponse = {
  onboardingStep: ResponseOnboardingStep;
}
