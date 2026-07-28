"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";

const RootProviders: React.FC<Props> = ({ children, session }) => {
  return (
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StoreProvider>
          <ThemeProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </StoreProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
};

export default RootProviders;
export type Props = {
  children: React.ReactNode;
  session: Session | null;
};
