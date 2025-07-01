import { TTheme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: TInitialState = {
  currentTheme: "dark",
};

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

export default appSlice.reducer
export const { setTheme } = appSlice.actions

export type TInitialState = {
  currentTheme: TTheme;
};
