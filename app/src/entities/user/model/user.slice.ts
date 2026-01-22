import { User } from "@/entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: undefined as User | undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export type TInitialState = typeof initialState;

