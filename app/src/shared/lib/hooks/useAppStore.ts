import type { AppStore } from "@/root";
import { useStore } from "react-redux";

export const useAppStore: () => AppStore = useStore;
