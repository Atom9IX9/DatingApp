import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "@/shared/model";
import { rtkAuthAPI } from "@/shared/api";
import { userReducer } from "@/entities/user";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [rtkAuthAPI.reducerPath]: rtkAuthAPI.reducer,
});

