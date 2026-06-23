import { makeStore } from "../store/store";

// Exported type alias used for typing shared data shapes.
export type AppStore = ReturnType<typeof makeStore>;
// Exported type alias used for typing shared data shapes.
export type RootState = ReturnType<AppStore["getState"]>;
// Exported type alias used for typing shared data shapes.
export type AppDispatch = AppStore["dispatch"];
