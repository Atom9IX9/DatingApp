import { makeStore } from "../store/store";

declare global {
  // Exported type alias used for typing shared data shapes.
  type AppStore = ReturnType<typeof makeStore>;
  // Exported type alias used for typing shared data shapes.
  type RootState = ReturnType<AppStore["getState"]>;
  // Exported type alias used for typing shared data shapes.
  type AppDispatch = AppStore["dispatch"];
}

export {};
