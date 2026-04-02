import { verifyAuth } from "@/features/auth";
import { cookies } from "next/headers";
import { GuestLayoutClient } from "@/processes/register";
import { VerifyAuthResponse } from "@/features/auth";

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get("accessToken")?.value;

  let onboardingStep = 0;
  let res: VerifyAuthResponse | undefined = undefined;

  if (token) {
    res = await verifyAuth(token);
    onboardingStep = res.data?.onboardingStep || 0;

    if (res.error?.statusCode === 403) {
      onboardingStep = 2;
    }
  }

  return (
    <GuestLayoutClient auth={res?.data} onboardingStep={onboardingStep}>
      {children}
    </GuestLayoutClient>
  );
};

export default GuestLayout;
