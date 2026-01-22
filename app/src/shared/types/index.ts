export type TChildren = Readonly<React.ReactNode>;
export type TTheme = "dark" | "light";
export type TValidationFunction = (
  value: string
) => boolean | string | Promise<boolean | string>;
export type AuthApiError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
export type RtkQueryResultError = {
  status: number;
  data?: {
    message: string;
  };
};

export { Colors } from "./colors";

export * from "./statusCodes";