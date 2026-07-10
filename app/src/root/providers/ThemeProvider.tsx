"use client";

import classNames from "classnames";
import { Box, ThemeProvider as Provider } from "@mui/material";

import { TChildren, TTheme } from "@/shared/types";
import { darkTheme, lightTheme } from "@/shared/themes";
import "@/shared/styles/globals.scss";

// Provider component that supplies context or store values for Theme.
const ThemeProvider: React.FC<Props> = ({ children, cookiesTheme }) => {
  // Render the component's JSX structure.
  return (
    <Provider
      theme={!cookiesTheme || cookiesTheme === "dark" ? darkTheme : lightTheme}
    >
      <Box className={classNames(cookiesTheme || "dark", "theme-wrap")}>
        {children}
      </Box>
    </Provider>
  );
};

// Provider that supplies Theme context or state.
export default ThemeProvider;
// Exported type alias used for typing shared data shapes.
export type Props = { children: TChildren; cookiesTheme?: TTheme };
