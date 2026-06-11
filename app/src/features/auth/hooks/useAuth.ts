
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// Custom hook that handles Auth logic.
export const useAuth = () => useContext(AuthContext);
