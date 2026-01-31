import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "@/shared/model";
import { rtkAuthAPI } from "@/shared/api";
import { userReducer } from "@/entities/user";
import { registerProcessReducer } from "@/processes/register";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  registerProcess: registerProcessReducer,
  [rtkAuthAPI.reducerPath]: rtkAuthAPI.reducer,
});

