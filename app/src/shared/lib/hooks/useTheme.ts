
import { ThemeContext } from "../../providers/ThemeProvider";
import { useContext } from "react";

// Custom hook that handles Theme logic.
export const useTheme = () => useContext(ThemeContext);
