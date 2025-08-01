"use client";
import { TChildren, TTheme } from "@/types/types";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import { UserAuthInfo } from "@/models/user.model";

export const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <StoreProvider>
      <AuthProvider cookiesAuth={cookies.auth}>
        <ThemeProvider cookiesTheme={cookies.theme}>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export type Props = {
  children: TChildren;
  cookies: {
    theme: TTheme | undefined;
    auth: UserAuthInfo | undefined;
  };
};
