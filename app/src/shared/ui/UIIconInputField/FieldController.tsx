import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import style from "./field.module.scss";
import SignInField, { InputParams } from "./Field";
import { TDateValidationFunction, TValidationFunction } from "@/shared/types";
import { Box } from "@mui/material";

function FieldController<FV extends FieldValues>({
  control,
  name,
  inputParams,
  validate,
  rootError,
}: Props<FV>) {
  return (
    <Box className={style.fieldContainer}>
      <Controller
        control={control}
        name={name}
        rules={{ validate }}
        render={({ field, fieldState }) => (
          <SignInField
            inputParams={inputParams}
            error={{
              field: fieldState.error?.message,
              root: rootError,
            }}
            field={field}
          />
        )}
      />
    </Box>
  );
}

export default FieldController;
type Props<V extends FieldValues> = {
  control: Control<V>;
  name: FieldPath<V>;
  inputParams?: InputParams;
  validate?: {
    [key: string]: TValidationFunction | TDateValidationFunction;
  };
  rootError?: string;
};

