"use client";
import StoreProvider from "./StoreProvider";
import { User } from "@/entities";
import { TChildren, TTheme, ThemeProvider } from "@/shared";
import { AuthProvider } from "@/features";

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
