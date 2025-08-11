import { configureStore } from "@reduxjs/toolkit";
import { rtkAuthAPI } from "../../api/auth/rtkQueryInstance";
import { reducerManager } from "./reducerManager";
import appSlice from "@/lib/store/slices/appSlice/appSlice";

export const makeStore = () => {
  reducerManager.add(rtkAuthAPI.reducerPath, rtkAuthAPI.reducer);
  reducerManager.add("app", appSlice);


  return configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(rtkAuthAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof reducerManager.reduce>;
export type AppDispatch = AppStore["dispatch"];
