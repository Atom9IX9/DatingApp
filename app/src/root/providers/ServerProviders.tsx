import { cookies } from "next/headers";

import { verifyAuth } from "@/features/auth/server";
import { TTheme } from "@/shared/types";

import ClientProviders from "./ClientProviders";

export default async function ServerProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value as TTheme | undefined;
  const onboardingStep = cookieStore.get("onboardingStep")?.value;

  let auth = null;

  try {
    auth = await verifyAuth();
  } catch (e) {
    console.log(e);
  }

  return (
    <ClientProviders
      auth={auth}
      cookies={{
        theme,
        onboardingStep,
      }}
    >
      {children}
    </ClientProviders>
  );
}
