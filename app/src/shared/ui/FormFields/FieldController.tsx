import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import style from "./field.module.scss";
import {
  TArrayValidationFunction,
  TControllerField,
  TDateValidationFunction,
  TValidationFunction,
} from "@/shared/types";
import { Box } from "@mui/material";
import { BasicFieldParams } from "../../types/fields";

function FieldController<FV extends FieldValues, P>({
  control,
  name,
  validate,
  rootError,
  onRender,
}: Props<FV, P>) {
  return (
    <Box className={style.fieldContainer}>
      <Controller
        control={control}
        name={name}
        rules={{ validate }}
        render={({ field, fieldState }) =>
          onRender({ field: fieldState.error?.message, root: rootError }, field)
        }
      />
    </Box>
  );
}

export default FieldController;

type Props<FV extends FieldValues, P> = FieldControllerProps<FV, P> & {
  onRender: (
    error: {
      field?: string | undefined;
      root?: string | undefined;
    },
    field: TControllerField<FieldValues>,
  ) => React.ReactElement;
};

export type FieldControllerProps<V extends FieldValues, P> = {
  control: Control<V>;
  name: FieldPath<V>;
  validate?: {
    [key: string]: TValidationFunction | TDateValidationFunction | TArrayValidationFunction;
  };
  rootError?: string;
  fieldParams?: BasicFieldParams<P>;
};
