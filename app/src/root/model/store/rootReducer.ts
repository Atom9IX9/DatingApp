import { combineReducers } from "@reduxjs/toolkit";

import { baseAPI } from "@/shared/api";
import { appReducer } from "@/shared/model";
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
