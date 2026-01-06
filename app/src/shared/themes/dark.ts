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
      main: "#e3507c",
    },
    secondary: {
      main: "#50e3b7",
    },
    info: {
      main: "#312956",
      dark: "#212530",
    }
  },
} as ThemeOptions);
