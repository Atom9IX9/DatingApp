"use client";
import { createContext, useEffect, useState } from "react";
import "@/shared/styles/globals.scss";
import classNames from "classnames";
import {
  ThemeProvider as Provider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { selectTheme } from "../model/selectors/appSelectors";
import dark from "../themes/dark";
import light from "../themes/light";
import { TChildren, TTheme } from "../types";
import { setTheme } from "../model";

export const ThemeContext = createContext<"light" | "dark">("dark");

const ThemeProvider: React.FC<Props> = ({ children, cookiesTheme }) => {
  const storeTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [currentTheme, setCurrentTheme] = useState<TTheme>(
    cookiesTheme || storeTheme
  );

  useEffect(() => {
    if (cookiesTheme && cookiesTheme !== storeTheme) {
      dispatch(setTheme(cookiesTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (storeTheme !== currentTheme) {
      setCurrentTheme(storeTheme);
    }
  }, [storeTheme, currentTheme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Provider theme={currentTheme === "dark" ? dark : light}>
        <div className={classNames(currentTheme, "theme-wrap")}>{children}</div>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export type Props = { children: TChildren; cookiesTheme?: TTheme };
