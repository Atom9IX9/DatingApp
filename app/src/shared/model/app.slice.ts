
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TTheme } from "../types";

// State shape for initial.
const initialState: TInitialState = {
  currentTheme: "dark",
};

// Redux slice that manages the app state.
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      Cookies.set("theme", action.payload)
      state.currentTheme = action.payload
    }
  }
})

// Redux slice that manages app state.
export default appSlice.reducer
export const { setTheme } = appSlice.actions

// Exported type alias used for typing shared data shapes.
export type TInitialState = {
  currentTheme: TTheme;
};
