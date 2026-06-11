
import type { AppStore } from "@/root";
import { useStore } from "react-redux";

// Custom hook that handles AppStore logic.
export const useAppStore: () => AppStore = useStore;
