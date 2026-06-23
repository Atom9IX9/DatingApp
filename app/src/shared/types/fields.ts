import { FieldValues } from "react-hook-form";

import { TControllerField } from ".";

// Exported type alias used for typing shared data shapes.
export type FieldProps<FV extends FieldValues, P> = {
  fieldParams?: BasicFieldParams<P>;
  error: {
    field?: string;
    root?: string;
  };
  field: TControllerField<FV>;
};

// Exported type alias used for typing shared data shapes.
export type BasicFieldParams<P> = {
  label?: string;
  isRequired?: boolean;
  autofocus?: boolean;
  autocomplete?: boolean;
} & P;

