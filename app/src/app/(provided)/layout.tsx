import { checkAuth } from "@/api/authAPI";
import Providers from "@/Providers";
import { TChildren } from "@/types/types";
import { cookies } from "next/headers";

const ProvidedLayout = async ({ children }: Props) => {
  const token = cookies().get("token")?.value;
  const response = await checkAuth(token);

  return <Providers auth={response.user}>{children}</Providers>;
};

type Props = { children: TChildren };

export default ProvidedLayout;
