"use client";

import { TChildren, TTheme } from "@/types/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import "../globals.scss";
import classNames from "classnames";
import {
  createTheme,
  ThemeProvider as Provider,
  ThemeOptions,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "@/selectors/appSelectors";
import { useAppDispatch } from "@/lib/store/hooks";
import { setTheme } from "@/lib/store/slices/appSlice/appSlice";
import dark from "@/themes/dark";
import light from "@/themes/light";

const ThemeContext = createContext<"light" | "dark">("dark");

const ThemeProvider: React.FC<Props> = ({ children, cookiesTheme }) => {
  const storeTheme = useSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [currentTheme, setCurrentTheme] = useState<TTheme>(cookiesTheme || storeTheme)

  useEffect(() => {
    
  }, [currentTheme, storeTheme])

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Provider theme={currentTheme === "dark" ? dark : light}>
        <div className={classNames(currentTheme, "theme-wrap")}>{children}</div>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
export type Props = { children: TChildren, cookiesTheme?: TTheme }
