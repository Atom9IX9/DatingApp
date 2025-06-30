import { UserAuthResponse } from "@/api/authAPI";
import { UserAuthInfo } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const initialState = {
  user: undefined as UserAuthInfo | undefined,
  fetchAuthStatus: undefined as number | QueryStatus | undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      const { user, token } = action.payload.auth;
      state.user = user;
      if (token) {
        Cookies.set("token", token);
      }
    },
    setFetchAuthStatus: (
      state,
      action: PayloadAction<QueryStatus | number>
    ) => {
      state.fetchAuthStatus = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, setFetchAuthStatus } = authSlice.actions;
export type TInitialState = typeof initialState;
type SetAuthPayload = {
  auth: UserAuthResponse;
};
