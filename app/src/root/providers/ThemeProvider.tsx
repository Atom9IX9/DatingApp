"use client";

import { ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import { TChildren } from "@/shared/types";
import { darkTheme, lightTheme } from "@/shared/themes";

import "@/shared/styles/globals.scss";

// Provider component that supplies context or store values for Theme.
const Provider: React.FC<Props> = ({ children }) => {
  // Next-themes hook to access the current theme and resolved theme.
  const { resolvedTheme } = useTheme();

  const theme = useMemo(() => {
    return resolvedTheme === "light" ? lightTheme : darkTheme;
  }, [resolvedTheme]);

  // Render the component's JSX structure.
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// Provider that supplies Theme context or state.
export default Provider;
// Exported type alias used for typing shared data shapes.
export type Props = { children: TChildren };
