import { Sex, User, UserAuth } from "@/entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccountInfo, UserInfo } from "../types/user";

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
  },
});

export default userSlice.reducer;
export const { setUserAuth, setUserAccountInfo, registerUserPersonalInfo } = userSlice.actions;
