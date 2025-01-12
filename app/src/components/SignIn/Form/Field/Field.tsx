import { TextField } from "@mui/material";
import classNames from "classnames";
import ErrorIcon from "@mui/icons-material/Error";
import style from "../signInForm.module.scss";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

function SignInField<FV extends FieldValues>({
  inputParams,
  error,
  field,
  icon,
}: InputProps<FV>) {
  return (
    <label
      className={classNames(style.fieldLabel, {
        [style.error]: error.field || error.root,
      })}
    >
      <div className={style.fieldIcon}>{icon}</div>
      <TextField
        fullWidth={true}
        variant="filled"
        {...field}
        required={inputParams?.isRequired}
        label={inputParams?.label}
        className={style.field}
        type={inputParams?.type || "text"}
      />
      {(error.field || error.root) && (
        <div className={style.errorIcon}>
          <ErrorIcon />
        </div>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </label>
  );
}

export default SignInField;
type InputProps<FV extends FieldValues> = {
  inputParams?: InputParams;
  error: {
    field?: string;
    root?: string;
  };
  field: ControllerRenderProps<FV, Path<FV>>;
  icon: JSX.Element;
};
export type InputParams = {
  label?: string;
  isRequired?: boolean;
  type?: "text" | "password";
};