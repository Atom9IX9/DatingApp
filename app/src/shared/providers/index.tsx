"use client";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import { UserAuthInfo } from "@/entities/user/model/user";
import { TChildren, TTheme } from "../types";

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
