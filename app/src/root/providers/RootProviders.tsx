"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

import StoreProvider from "./StoreProvider";

const RootProviders: React.FC<Props> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider>
        <SessionProvider>
          <Suspense>{children}</Suspense>
        </SessionProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};

export default RootProviders;
export type Props = {
  children: React.ReactNode;
};
