"use client";
import { User } from "@/entities/user";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/features";
import { ThemeProvider } from "@/shared/providers";
import { TChildren, TTheme } from "@/shared/types";

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
