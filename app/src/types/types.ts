export type TChildren = Readonly<React.ReactNode>;
export type TTheme = "dark" | "light";
export type TValidationFunction = (
  value: string
) => boolean | string | Promise<boolean | string>;
export type TApiError = {
  status: number;
  data?: {
    message: string;
  };
};
