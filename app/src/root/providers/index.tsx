"use client";
import { User } from "@/entities/user";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/features/auth";
import { ThemeProvider } from "@/shared/providers";
import { TChildren, TTheme } from "@/shared/types";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <StoreProvider>
      <AuthProvider cookiesUser={cookies.user}>
        <AppRouterCacheProvider>
          <ThemeProvider cookiesTheme={cookies.theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
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
