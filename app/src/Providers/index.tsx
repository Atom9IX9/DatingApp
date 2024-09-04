"use client";

import { TChildren } from "@/types/types";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";

const Providers: React.FC<{ children: TChildren }> = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
