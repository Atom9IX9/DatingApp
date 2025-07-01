import { checkAuth } from "@/api/authAPI";
import Providers from "@/Providers";
import { TChildren, TTheme } from "@/types/types";
import { cookies } from "next/headers";

const ProvidedLayout = async ({ children }: Props) => {
  const token = cookies().get("token")?.value;
  const theme = cookies().get("theme")?.value as TTheme | undefined;
  const response = await checkAuth(token);

  return (
    <Providers cookies={{ auth: response.user, theme }}>{children}</Providers>
  );
};

type Props = { children: TChildren };

export default ProvidedLayout;
