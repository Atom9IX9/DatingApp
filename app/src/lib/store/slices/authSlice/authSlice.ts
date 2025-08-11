import { User } from "@/entities";
import { reducerManager } from "@/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";

const initialState = {
  user: undefined as User | undefined,
  fetchAuthStatus: undefined as number | QueryStatus | undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFetchAuthStatus: (
      state,
      action: PayloadAction<QueryStatus | number>
    ) => {
      state.fetchAuthStatus = action.payload;
    },
  },
});

reducerManager.add("auth", authSlice.reducer);
export default authSlice.reducer;
export const { setFetchAuthStatus } = authSlice.actions;
export type TInitialState = typeof initialState;
