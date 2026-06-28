import { createTheme, ThemeOptions } from "@mui/material";

// Factory helper that creates theme objects or state.
export const darkTheme = createTheme({
  components: {
    typography: {
      fontFamily: [
        "var(--font-primary)", // Primary font
        "Arial", // Fallback fonts
        "sans-serif",
      ].join(","),
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h3: "h3",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FF1D4A",
    },
    secondary: {
      main: "#00FFC8",
    },
    info: {
      main: "#3C66FF",
      dark: "#2A2A37",
      light: "#6788ff",
    },
    success: {
      main: "#27CC7F",
    },
    error: {
      main: "#ff454f",
    },
  },
} as ThemeOptions);
