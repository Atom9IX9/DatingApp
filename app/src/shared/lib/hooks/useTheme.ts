import { useContext } from "react";

import { ThemeContext } from "@/shared/contexts";

// Custom hook that handles Theme logic.
export const useTheme = () => useContext(ThemeContext);
