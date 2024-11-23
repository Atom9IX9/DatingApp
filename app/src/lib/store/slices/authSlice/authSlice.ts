import { UserAuth } from "@/api/authAPI";
import { User } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: undefined as User | undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserAuth>) => {
      if (action.payload) {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      }
    },
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
export type TInitialState = typeof initialState;
