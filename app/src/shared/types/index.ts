
import { Dayjs } from "dayjs";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

// Exported type alias used for typing shared data shapes.
export type TChildren = Readonly<React.ReactNode>;
// Exported type alias used for typing shared data shapes.
export type TTheme = "dark" | "light";
// Exported type alias used for typing shared data shapes.
export type TValidationFunction = (
  value: string
) => boolean | string | Promise<boolean | string>;
// Exported type alias used for typing shared data shapes.
export type TArrayValidationFunction = (
  value: any[]
) => boolean | string | Promise<boolean | string>;
// Exported type alias used for typing shared data shapes.
export type TDateValidationFunction = (
  value: Dayjs
) => boolean | string | Promise<boolean | string>;
// Exported type alias used for typing shared data shapes.
export type AuthApiError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
// Exported type alias used for typing shared data shapes.
export type RtkQueryResultError = {
  status: number;
  data?: {
    message: string;
  };
};
// Exported type alias used for typing shared data shapes.
export type TControllerField<FV extends FieldValues> = ControllerRenderProps<FV, Path<FV>>

export { Colors } from "./colors";
export { PaletteColors } from "./colors"
export { type PaletteShade } from "./colors"
export { type ThemeColor } from "./colors"

export * from "./statusCodes";