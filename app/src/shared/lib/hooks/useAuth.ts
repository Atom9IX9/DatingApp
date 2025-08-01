import { AuthContext } from "@/shared/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
