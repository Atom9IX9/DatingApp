"use client";

import { TChildren } from "@/types/types";
import ThemeProvider from "./ThemeProvider";

const Providers: React.FC<{ children: TChildren }> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
