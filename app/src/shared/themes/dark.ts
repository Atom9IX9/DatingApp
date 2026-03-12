import { createTheme, ThemeOptions } from "@mui/material";

export default createTheme({
  components: {
    typography: {
    fontFamily: [
      'var(--font-primary)', // Primary font
      'Arial',         // Fallback fonts
      'sans-serif',
    ].join(','),
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
      main: "#2A2A37",
      dark: "#ff0000ff",
      light: "#3C66FF"
    },
    success: {
      main: "#27CC7F",
    },
    error: {
      main: "#ff454f"
    },
  },
} as ThemeOptions);
