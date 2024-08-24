import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@/lib/store/slices/appSlice/appSlice";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer 