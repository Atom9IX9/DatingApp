import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { rtkAuthAPI } from "@/shared";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkAuthAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
