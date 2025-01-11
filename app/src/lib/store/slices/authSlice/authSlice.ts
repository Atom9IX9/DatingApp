import { authAPI, UserAuth } from "@/api/authAPI";
import { AuthUser } from "@/models/user.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";

const initialState = {
  user: undefined as AuthUser | undefined,
  fetchAuthStatus: undefined as QueryStatus | undefined,
};

export const initialize = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    const auth = await dispatch(authAPI.endpoints.checkAuth.initiate());
    if (auth.data) dispatch(setAuth({ user: auth.data }));
    dispatch(setFetchAuthStatus(auth.status))
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserAuth>) => {
      if (action.payload) {
        const { user, token } = action.payload;
        state.user = user;
        if (token) {
          localStorage.setItem("token", token);
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
