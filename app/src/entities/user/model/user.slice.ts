import { User } from "@/entities";
import { reducerManager } from "@/shared";
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

reducerManager.add("user", userSlice.reducer);

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export type TInitialState = typeof initialState;

