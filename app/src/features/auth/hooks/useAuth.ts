import { useContext } from "react";

import { AuthContext } from "../contexts";

// Custom hook that handles Auth logic.
export const useAuth = () => useContext(AuthContext);
