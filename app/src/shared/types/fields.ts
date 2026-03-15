import { FieldValues } from "react-hook-form";
import { TControllerField } from ".";

export type FieldProps<FV extends FieldValues> = {
  inputParams?: FieldParams;
  error: {
    field?: string;
    root?: string;
  };
  field: TControllerField<FV>;
};
export type FieldParams = {
  label?: string;
  isRequired?: boolean;
  type?: "text" | "password" | "date" | "multilineText";
  autofocus?: boolean;
  autocomplete?: boolean;
};
