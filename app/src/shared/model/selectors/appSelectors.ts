import { AppStateSchema } from "../app.slice";

export const selectTheme = (state: AppStateSchema) => state.app.currentTheme 