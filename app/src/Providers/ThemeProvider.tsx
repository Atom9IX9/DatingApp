import { TChildren } from "@/types/types";
import { createContext, useContext } from "react";
import "../app/globals.scss"
import classNames from "classnames";

const ThemeContext = createContext<"light" | "dark">("light");


const ThemeProvider: React.FC<{children: TChildren}> = ({ children }) => {
  const theme = "light"
  return (
    <ThemeContext.Provider value={theme}>
      <div className={classNames(theme, "theme-wrap")}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
