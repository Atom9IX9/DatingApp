export { setTheme } from "./model/app.slice";
export { default as appReducer } from "./model/app.slice";
export { default as ThemeProvider } from "./providers/ThemeProvider";
export * as appSelectors from "./model/selectors/appSelectors";

// hooks
export { useAppStore } from "./lib/hooks/useAppStore";
export { useAppSelector } from "./lib/hooks/useAppSelector";
export { useAppDispatch } from "./lib/hooks/useAppDispatch";
export { useTheme } from "./lib/hooks/useTheme";
export { useMenu } from "./lib/hooks/useMenu";

//ui components
export { default as UIMenu } from "./ui/UIMenu";
export { default as UIIconMenuButton } from "./ui/UIIconMenuButton";
export { default as UIIconInputField } from "./ui/UIIconInputField/FieldController";

// helpers
export { stringToColor } from "./lib/helpers/stringToColor";
export { capitalize } from "./lib/helpers/capitalize";

// types
export * from "./types";
export { Colors } from "./types/colors";

// api
export { rtkAuthAPI } from "./api/auth/rtkQueryInstance";
