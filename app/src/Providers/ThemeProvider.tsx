"use client"

import { TChildren, TTheme } from "@/types/types";
import { createContext, useContext, useEffect } from "react";
import "../globals.scss";
import classNames from "classnames";
import { createTheme, ThemeProvider as Provider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "@/selectors/appSelectors";
import { useAppDispatch } from "@/lib/store/hooks";
import { setTheme } from "@/lib/store/slices/appSlice/appSlice";

const ThemeContext = createContext<"light" | "dark">("light");
const light = createTheme({
  palette: {
    primary: {
      main: "#e3507c",
    },
    secondary: {
      main: "#50e3b7",
    },
  },
});

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
