"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import NextThemeProvider from "./NextThemeProvider";

const RootProviders: React.FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StoreProvider>
          <NextThemeProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </NextThemeProvider>
        </StoreProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
};

export default RootProviders;
export type Props = {
  children: React.ReactNode;
};
