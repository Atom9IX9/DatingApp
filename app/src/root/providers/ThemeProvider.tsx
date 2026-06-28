"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { ThemeProvider as Provider } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { selectTheme } from "@/shared/model";
import { TChildren, TTheme } from "@/shared/types";
import { setTheme } from "@/shared/model";
import { ThemeContext } from "@/shared/contexts";
import { darkTheme, lightTheme } from "@/shared/themes";
import "@/shared/styles/globals.scss";

// Provider component that supplies context or store values for Theme.
const ThemeProvider: React.FC<Props> = ({ children, cookiesTheme }) => {
  const storeTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [currentTheme, setCurrentTheme] = useState<TTheme>(
    cookiesTheme || storeTheme,
  );

  useEffect(() => {
    if (cookiesTheme && cookiesTheme !== storeTheme) {
      dispatch(setTheme(cookiesTheme));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (storeTheme !== currentTheme) {
      setCurrentTheme(storeTheme);
    }
  }, [storeTheme, currentTheme]);

  // Render the component's JSX structure.
  return (
    <ThemeContext.Provider value={currentTheme}>
      <Provider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
        <div className={classNames(currentTheme, "theme-wrap")}>{children}</div>
      </Provider>
    </ThemeContext.Provider>
  );
};

// Provider that supplies Theme context or state.
export default ThemeProvider;
// Exported type alias used for typing shared data shapes.
export type Props = { children: TChildren; cookiesTheme?: TTheme };
