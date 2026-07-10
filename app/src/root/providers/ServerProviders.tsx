import { cookies } from "next/headers";
import { verifyAuth } from "@/features/auth/server";

import ClientProviders from "./ClientProviders";
import { TTheme } from "@/shared/types";

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
  } catch {}

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
