import { verifyAuth } from "@/features";
import { Providers } from "@/root";
import { TChildren, TTheme } from "@/shared";
import { cookies } from "next/headers";

const ProvidedLayout = async ({ children }: Props) => {
  const token = cookies().get("token")?.value;
  const theme = cookies().get("theme")?.value as TTheme | undefined;
  const response = await verifyAuth(token);

  return (
    <Providers cookies={{ user: response.user, theme }}>{children}</Providers>
  );
};

type Props = { children: TChildren };

export default ProvidedLayout;
