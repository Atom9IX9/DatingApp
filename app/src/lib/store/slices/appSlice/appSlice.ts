import { TTheme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  currentTheme: "dark",
  isInitialized: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      localStorage.setItem("theme", action.payload)
      state.currentTheme = action.payload
    },
    initialize: (state) => {
      state.isInitialized = true;
    }
  }
})

export default appSlice.reducer
export const { setTheme, initialize } = appSlice.actions

export type TInitialState = {
  currentTheme: TTheme;
  isInitialized: boolean;
};
