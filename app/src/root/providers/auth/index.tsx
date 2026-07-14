import { TChildren } from "@/shared/types";
import { VerifyAuthResponse } from "@/features/auth";

import AuthProvider from "./AuthProvider";

const AuthProviders = ({ auth, children }: Props) => {
  return <AuthProvider auth={auth?.data || null}>{children}</AuthProvider>;
};

export default AuthProviders;
export type Props = {
  children: TChildren;
  auth: VerifyAuthResponse | null;
};
