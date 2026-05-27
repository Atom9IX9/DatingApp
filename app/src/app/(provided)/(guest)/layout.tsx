import {
  ClientOnboardingStep,
  OnboardingStep,
  ResponseOnboardingStep,
  verifyAuth,
} from "@/features/auth";
import { cookies } from "next/headers";
import { GuestLayoutClient } from "@/processes/register";
import { VerifyAuthResponse } from "@/features/auth";
import { redirect } from "next/navigation";

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get("accessToken")?.value;

  let onboardingStep: OnboardingStep = ClientOnboardingStep.CREDENTIALS;
  let res: VerifyAuthResponse | undefined = undefined;

  if (token) {
    res = await verifyAuth(token);
    onboardingStep =
      res.data?.onboardingStep || ClientOnboardingStep.CREDENTIALS;

    if (res.error?.statusCode === 403) {
      onboardingStep = ClientOnboardingStep.INFO;
    }

    if (res.data?.onboardingStep === ResponseOnboardingStep.REGISTERED) {
      redirect("/home")
    }
  }

  return (
    <GuestLayoutClient auth={res?.data} onboardingStep={onboardingStep}>
      {children}
    </GuestLayoutClient>
  );
};

export default GuestLayout;
