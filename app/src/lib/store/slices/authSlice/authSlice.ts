import { authAPI, UserAuthResponse } from "@/api/authAPI";
import { UserAuthInfo } from "@/models/user.model";
import { getJwtExpiresDateFromSeconds } from "@/utils/getJwtExpiresDateFromSeconds";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const initialState = {
  user: undefined as UserAuthInfo | undefined,
  fetchAuthStatus: undefined as QueryStatus | undefined,
};

export const initialize = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    const auth = await dispatch(authAPI.endpoints.checkAuth.initiate());
    if (auth.data) dispatch(setAuth({ auth: { user: auth.data } }));
    dispatch(setFetchAuthStatus(auth.status));
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      const { user, token } = action.payload.auth;
      state.user = user;
      if (token) {
        if (action.payload.remembering) {
          Cookies.set("token", token, {
            expires: getJwtExpiresDateFromSeconds(
              Number(process.env.NEXT_PUBLIC_REMEMBERING_JWT_EXPIRE)
            ),
          });
        } else {
          Cookies.set("token", token, {
            expires: getJwtExpiresDateFromSeconds(
              Number(process.env.NEXT_PUBLIC_JWT_EXPIRE)
            ),
          });
        }
      }
    },
    setFetchAuthStatus: (state, action: PayloadAction<QueryStatus>) => {
      state.fetchAuthStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.pending, (state) => {
      state.fetchAuthStatus = QueryStatus.pending;
    });
  },
});

export default authSlice.reducer;
export const { setAuth, setFetchAuthStatus } = authSlice.actions;
export type TInitialState = typeof initialState;
type SetAuthPayload = {
  remembering?: boolean;
  auth: UserAuthResponse;
};
