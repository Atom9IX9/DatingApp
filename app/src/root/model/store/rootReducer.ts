import { combineReducers } from "@reduxjs/toolkit";

import { baseAPI } from "@/shared/api";
import appReducer from "@/shared/model/app.slice";
import userReducer from "@/entities/user/model/user.slice";
import registerProcessReducer from "@/processes/register/model/registerProcess.slice";
import avatarReducer from "@/entities/avatar/model/avatar.slice";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  registerProcess: registerProcessReducer,
  avatar: avatarReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

