import { verifyAuth } from "@/features/auth";
import { VerifyAuthResponse } from "@/features/auth";
import { Providers } from "@/root";
import { TChildren, TTheme } from "@/shared/types";
import { cookies } from "next/headers";

const ProvidedLayout = async ({ children }: Props) => {
  const token = cookies().get("accessToken")?.value;
  const theme = cookies().get("theme")?.value as TTheme | undefined;
  let authResponse: VerifyAuthResponse | undefined;

  if (token) {
    authResponse = await verifyAuth(token);
  }

  return (
    <Providers auth={authResponse?.data} cookies={{ theme }}>
      {children}
    </Providers>
  );
};

type Props = { children: TChildren };

export default ProvidedLayout;
