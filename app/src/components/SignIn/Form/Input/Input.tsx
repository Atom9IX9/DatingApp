import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import style from "../signInForm.module.scss";

function SignInInput<FV extends FieldValues>({
  control,
  name,
  inputProps,
  icon,
}: Props<FV>) {
  return (
    <div className={style.fieldContainer}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <label className={style.fieldLabel}>
            <div className={style.fieldIcon}>{icon}</div>
            <TextField
              fullWidth={true}
              variant="filled"
              {...field}
              required={inputProps?.isRequired}
              label={inputProps?.label}
              className={style.field}
              type={inputProps?.type || "text"}
            />
          </label>
        )}
      />
    </div>
  );
}

export default SignInInput;
type Props<V extends FieldValues> = {
  control: Control<V>;
  name: FieldPath<V>;
  inputProps?: {
    label?: string;
    isRequired?: boolean;
    type?: "text" | "password"
  };
  icon: JSX.Element;
};
