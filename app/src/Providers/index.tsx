"use client"

import { TChildren } from "@/types/types";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";

const Providers: React.FC<{ children: TChildren, auth: any}> = ({ children, auth }) => {
  return (
    <StoreProvider>
      <AuthProvider auth={auth}>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
