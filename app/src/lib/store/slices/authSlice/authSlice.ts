import { authAPI, UserAuth } from "@/api/authAPI";
import { AuthUser } from "@/models/user.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";

const initialState = {
  user: undefined as AuthUser | undefined,
  fetchAuthStatus: QueryStatus,
};

export const initialize = createAsyncThunk(
  "auth/init",
  async (_, { dispatch }) => {
    const auth = await dispatch(authAPI.endpoints.checkAuth.initiate());
    if (auth.data) dispatch(setAuth({ user: auth.data }));
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
      //@ts-ignore
      state.fetchAuthStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.pending, (state) => {
      //@ts-ignore
      state.fetchAuthStatus = QueryStatus.pending;
    });
    builder.addCase(initialize.rejected, (state) => {
      //@ts-ignore
      state.fetchAuthStatus = QueryStatus.rejected;
    });
    builder.addCase(initialize.fulfilled, (state) => {
      //@ts-ignore
      state.fetchAuthStatus = QueryStatus.fulfilled;
    });
  },
});

export default authSlice.reducer;
export const { setAuth, setFetchAuthStatus } = authSlice.actions;
export type TInitialState = typeof initialState;
