
import type { RootState } from "@/root";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Custom hook that handles AppSelector logic.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
