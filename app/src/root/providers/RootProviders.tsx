"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import StoreProvider from "./StoreProvider";

const RootProviders: React.FC<Props> = ({ children, session }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};

export default RootProviders;
export type Props = {
  children: React.ReactNode;
  session: Session | null;
};
