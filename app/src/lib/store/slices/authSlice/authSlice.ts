import { TCreateUserData, User } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null as User | null,
};

const authSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TCreateUserData>) => {
      state.user = new User(
        action.payload.id,
        action.payload.firstName,
        action.payload.lastName,
        action.payload.age,
        action.payload.gender,
        action.payload.photos
      );
    },
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions
export type TInitialState = typeof initialState;
