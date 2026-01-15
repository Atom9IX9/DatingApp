import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "@/entities";
import { appReducer } from "@/shared/model";
import { rtkAuthAPI } from "@/shared/api";

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [rtkAuthAPI.reducerPath]: rtkAuthAPI.reducer,
});

