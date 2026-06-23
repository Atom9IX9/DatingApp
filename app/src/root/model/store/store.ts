import { configureStore } from "@reduxjs/toolkit";

import { baseAPI } from "@/shared/api";

import { rootReducer } from "./rootReducer";

// Utility that builds or initializes store values.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseAPI.middleware),
  });
};
