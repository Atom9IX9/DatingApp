import { TChildren } from "@/types/types";
import { createContext, useContext } from "react";
import "../globals.scss";
import classNames from "classnames";
import { createTheme, ThemeProvider as Provider } from "@mui/material";

const ThemeContext = createContext<"light" | "dark">("light");
const light = createTheme({
  palette: {
    primary: {
      main: "#e3507c",
    },
    secondary: { 
      main: "#50e3b7" 
    },
  },
});

const ThemeProvider: React.FC<{ children: TChildren }> = ({ children }) => {
  const currentTheme = "light";
  return (
    <ThemeContext.Provider value={currentTheme}>
      <Provider theme={light}>
        <div className={classNames(currentTheme, "theme-wrap")}>{children}</div>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
