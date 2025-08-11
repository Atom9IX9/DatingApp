"use client";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import { User } from "@/entities";
import { TChildren, TTheme } from "../types";

export const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <StoreProvider>
      <AuthProvider cookiesUser={cookies.user}>
        <ThemeProvider cookiesTheme={cookies.theme}>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export type Props = {
  children: TChildren;
  cookies: {
    theme: TTheme | undefined;
    user: User | undefined;
  };
};
