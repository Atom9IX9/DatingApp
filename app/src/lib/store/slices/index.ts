import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@/lib/store/slices/appSlice/appSlice";
import authReducer from "./authSlice/authSlice";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
