
import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "@/shared/model";
import { baseAPI } from "@/shared/api";
import { userReducer } from "@/entities/user";
import { registerProcessReducer } from "@/processes/register";
import { avatarReducer } from "@/entities/avatar";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  registerProcess: registerProcessReducer,
  avatar: avatarReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

