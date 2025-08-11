export { Providers } from "./providers";
export { reducerManager } from "./lib/store/reducerManager";

// hooks
export { useAppStore } from "./lib/hooks/useAppStore";
export { useAppSelector } from "./lib/hooks/useAppSelector";
export { useAppDispatch } from "./lib/hooks/useAppDispatch";
export { useAuth } from "./lib/hooks/useAuth";
export { useTheme } from "./lib/hooks/useTheme";
export { useMenu } from "./lib/hooks/useMenu";

//ui components
export { default as UIMenu } from "./ui/UIMenu";
export { default as UIIconMenuButton } from "./ui/UIIconMenuButton";
export { default as UIIconInputField } from "./ui/UIIconInputField/FieldController"

// helpers
export { stringToColor } from "./lib/helpers/stringToColor";
export { capitalize } from "./lib/helpers/capitalize";

// types
export * from "./types";
export type { RootState } from "./lib/store";

// api
export { rtkAuthAPI } from "./api/auth/rtkQueryInstance";
