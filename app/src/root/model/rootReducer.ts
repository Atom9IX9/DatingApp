import { combineReducers } from "@reduxjs/toolkit";
import { appReducer, rtkAuthAPI } from "@/shared";
import { userReducer } from "@/entities";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [rtkAuthAPI.reducerPath]: rtkAuthAPI.reducer,
});

