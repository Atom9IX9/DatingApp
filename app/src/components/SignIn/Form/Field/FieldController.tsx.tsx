import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFormState,
} from "react-hook-form";
import style from "../signInForm.module.scss";
import { TValidationFunction } from "@/types/types";
import SignInField, { InputParams } from "./Field";

function SignInFieldController<FV extends FieldValues>({
  control,
  name,
  inputParams,
  icon,
  validate,
  errors
}: Props<FV>) {
  return (
    <div className={style.fieldContainer}>
      <Controller
        control={control}
        name={name}
        rules={{ validate }}
        render={({ field, fieldState }) => (
          <SignInField
            inputParams={inputParams}
            error={{
              field: fieldState.error?.message,
              root: errors.root?.message,
            }}
            field={field}
            icon={icon}
          />
        )}
      />
    </div>
  );
}

export default SignInFieldController;
type Props<V extends FieldValues> = {
  control: Control<V>;
  name: FieldPath<V>;
  inputParams?: InputParams;
  icon: JSX.Element;
  validate?: {
    [key: string]: TValidationFunction;
  };
  errors: FieldErrors<V>
};

