import { Sex, User, UserAuth } from "@/entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hobby, UserAccountInfo, UserInfo } from "../types/user";

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

export default userSlice.reducer;
export const { setUserAuth, setUserAccountInfo, registerUserPersonalInfo, setUserDescription } =
  userSlice.actions;
