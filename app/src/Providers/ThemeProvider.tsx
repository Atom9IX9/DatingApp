import { TChildren } from "@/types/types";
import { createContext, useContext } from "react";

const ThemeContext = createContext<"light" | "dark">("light");

const ThemeProvider: React.FC<TChildren> = ({ children }) => {
  return (
    <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
