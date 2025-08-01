import { ThemeContext } from "@/shared/providers/ThemeProvider";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
