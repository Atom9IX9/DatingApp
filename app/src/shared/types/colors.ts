export enum Colors {
  Primary = "primary",
  PrimaryMain = "primary.main", // todo: del
  Secondary = "secondary",
  PrimaryDark = "primary.dark",
  PrimaryContrastText = "primary.contrastText",
  Info = "info",
  InfoDark = "info.dark",
  InfoLight = "info.light",
  InfoContrastText = "info.contrastText",
  Active = "active",
  Danger = "#ff474c",
  Gray = "#8b8b8b",
  Light = "#ECDFCC",
  PrimaryLight = "primary.light",
  SecondaryLight = "#00FFC8",
  TriadicLight2 = "#7ce350",
  TriadicLight = "#e3b750",
  TriadicLight900 = "#dd7400",
  White = "#ffffff",
  Success = "success.main",
}

export enum PaletteColors {
  Primary = "primary",
  Secondary = "secondary",
  Info = "info",
  Success = "success",
}

// Exported type alias used for typing shared data shapes.
export type PaletteShade = "main" | "light" | "dark";

// Exported type alias used for typing shared data shapes.
export type ThemeColor = `${PaletteColors}.${PaletteShade}`;
