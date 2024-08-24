import { TTheme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  currentTheme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      localStorage.setItem("theme", action.payload)
      state.currentTheme = action.payload
    }
  }
})

export default appSlice.reducer
export const { setTheme } = appSlice.actions

export type TInitialState = {
  currentTheme: TTheme;
};
