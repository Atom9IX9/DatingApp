export type TChildren = Readonly<React.ReactNode>
export enum Colors {
  Primary = "primary",
  Secondary = "secondary",
  PrimaryDark = "primary.dark",
  PrimaryContrastText = "primary.contrastText",
  Active = "active",
  Danger = "#ff474c",
  SecondaryDark = "#3C3D37",
  SecondaryDark600 = "#6e6f69",
  Gray = "#8b8b8b",
  Light = "#ECDFCC",
  PrimaryLight = "primary.light",
  SecondaryLight = "#50e3b7",
  TriadicLight2 = "#7ce350",
  TriadicLight = "#e3b750",
  TriadicLight900 = "#dd7400",
  White = "#ffffff"
}
export type TTheme = "dark" | "light"
export type TValidationFunction = (value: string) => boolean | string | Promise<boolean | string> 
export type TApiError = {
  status: number;
  data?: {
    message: string;
  }
}
