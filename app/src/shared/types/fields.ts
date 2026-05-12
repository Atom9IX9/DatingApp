import { FieldValues } from "react-hook-form";
import { TControllerField } from ".";

export type FieldProps<FV extends FieldValues, P> = {
  fieldParams?: BasicFieldParams<P>;
  error: {
    field?: string;
    root?: string;
  };
  field: TControllerField<FV>;
};

export type BasicFieldParams<P> = {
  label?: string;
  isRequired?: boolean;
  autofocus?: boolean;
  autocomplete?: boolean;
} & P;

// export type FieldParams = {
//   label?: string;
//   isRequired?: boolean;
//   type?: "text" | "password" | "date" | "multilineText";
//   autofocus?: boolean;
//   autocomplete?: boolean;
//   rows?: number;
//   maxLength?: number;
// };
