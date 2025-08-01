import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@/lib/store/slices/appSlice/appSlice";
import authReducer from "@/lib/store/slices/authSlice/authSlice";
import { authAPI } from "@/api/authAPI";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export default rootReducer;
