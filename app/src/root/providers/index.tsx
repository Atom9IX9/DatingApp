"use client";
import { User } from "@/entities/user";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/features/auth";
import { ThemeProvider } from "@/shared/providers";
import { TChildren, TTheme } from "@/shared/types";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <StoreProvider>
      <AuthProvider cookiesUser={cookies.user}>
        <AppRouterCacheProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider cookiesTheme={cookies.theme}>
              {children}
            </ThemeProvider>
          </LocalizationProvider>
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
