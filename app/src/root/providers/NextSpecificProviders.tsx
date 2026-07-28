import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { TChildren } from "@/shared/types";

import NextThemeProvider from "./NextThemeProvider";
import ThemeProvider from "./ThemeProvider";

const NextProviders: React.FC<{ children: TChildren }> = ({ children }) => {
  return (
    <NextThemeProvider>
      <ThemeProvider>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </ThemeProvider>
    </NextThemeProvider>
  );
};

export default NextProviders;
