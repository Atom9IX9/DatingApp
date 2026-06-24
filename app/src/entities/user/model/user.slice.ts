import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Sex, User, UserAuth } from "../types/user";
import { Hobby, UserAccountInfo, UserInfo } from "../types/user";

// State shape for initial.
const initialState: User = {
  uid: "",
  firstName: "",
  lastName: "",
  gender: Sex.Custom,
  age: 0,
  dateOfBD: "",
  auth: {
    authId: 0,
    email: "",
  },
  description: "",
  hobbies: [],
};

// Custom hook that handles rSlice logic.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAccountInfo: (state, action: PayloadAction<UserAccountInfo>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.uid = action.payload.uid;
    },
    setUserAuth: (state, action: PayloadAction<UserAuth>) => {
      state.auth = action.payload;
    },
    registerUserPersonalInfo: (state, action: PayloadAction<UserInfo>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.uid = action.payload.uid;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.dateOfBD = action.payload.dateOfBD;
    },
    setUserDescription: (
      state,
      action: PayloadAction<{ description: string; hobbies: Hobby[] }>,
    ) => {
      state.description = action.payload.description;
      state.hobbies = action.payload.hobbies;
    },
  },
});

// Custom hook that manages rSlice logic.
export default userSlice.reducer;
export const {
  setUserAuth,
  setUserAccountInfo,
  registerUserPersonalInfo,
  setUserDescription,
} = userSlice.actions;
