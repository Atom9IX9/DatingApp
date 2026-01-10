import { createTheme, ThemeOptions } from "@mui/material";

export default createTheme({
  components: {
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
    primary: {
      main: "#FF1D4A",
    },
    secondary: {
      main: "#00FFC8",
    },
    info: {
      main: "#2A2A37",
      dark: "#ff0000ff",
    }
  },
} as ThemeOptions);
