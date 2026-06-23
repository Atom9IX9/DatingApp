import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../types";

// Custom hook that handles AppSelector logic.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook that handles AppDispatch logic.
export const useAppDispatch = () => useDispatch<AppDispatch>();
