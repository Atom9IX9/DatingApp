"use client"

import { TChildren, TTheme } from "@/types/types";
import { createContext, useContext, useEffect } from "react";
import "../globals.scss";
import classNames from "classnames";
import { createTheme, ThemeProvider as Provider, ThemeOptions } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "@/selectors/appSelectors";
import { useAppDispatch } from "@/lib/store/hooks";
import { setTheme } from "@/lib/store/slices/appSlice/appSlice";

const ThemeContext = createContext<"light" | "dark">("light");
const light = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h3: "h3"
        }
      }
    }
  },
  palette: {
    primary: {
      light: "#ffffff",
      main: "#e3507c",
      dark: "#1E201E",
    },
    secondary: {
      light: "",
      main: "#50e3b7",
      dark: "#3C3D37",
    },
  },
} as ThemeOptions);

const ThemeProvider: React.FC<{ children: TChildren }> = ({ children }) => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTheme((localStorage.getItem("theme") as TTheme) || "light"));
  }, [dispatch]);

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
