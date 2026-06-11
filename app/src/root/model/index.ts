
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { baseAPI } from "@/shared/api";

// Utility that builds or initializes store values.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseAPI.middleware),
  });
};

// Exported type alias used for typing shared data shapes.
export type AppStore = ReturnType<typeof makeStore>;
// Exported type alias used for typing shared data shapes.
export type RootState = ReturnType<AppStore["getState"]>;
// Exported type alias used for typing shared data shapes.
export type AppDispatch = AppStore["dispatch"];
