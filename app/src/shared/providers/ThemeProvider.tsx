"use client";
import { TChildren, TTheme } from "@/types/types";
import { createContext, useEffect, useState } from "react";
import "@/shared/styles/globals.scss";
import classNames from "classnames";
import {
  ThemeProvider as Provider,
} from "@mui/material";
import { useAppSelector } from "@/shared";
import { selectTheme } from "@/selectors/appSelectors";
import { useAppDispatch } from "@/shared";
import { setTheme } from "@/lib/store/slices/appSlice/appSlice";
import dark from "@/themes/dark";
import light from "@/themes/light";

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
