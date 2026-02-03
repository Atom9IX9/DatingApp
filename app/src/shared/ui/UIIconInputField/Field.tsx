import { Box, InputLabel, TextField } from "@mui/material";
import classNames from "classnames";
import ErrorIcon from "@mui/icons-material/Error";
import style from "./field.module.scss";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

function SignInField<FV extends FieldValues>({
  inputParams,
  error,
  field,
}: InputProps<FV>) {
  return (
    <Box
      className={classNames(style.fieldLabel, {
        [style.error]: error.field || error.root,
      })}
    >
      <InputLabel
        shrink
        sx={{
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "var(--font-primary)",
          "&.Mui-focused": {
            color: "primary.main",
          },
        }}
        htmlFor={field.name}
      >
        {inputParams?.label}
      </InputLabel>

      <TextField
        id={field.name}
        fullWidth={true}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 0,
            input: {
              padding: "0px 42px 0px 16px",
              height: 52,
            },
          },
        }}
        variant="filled"
        {...field}
        required={inputParams?.isRequired}
        type={inputParams?.type || "text"}
        autoComplete={inputParams?.autocomplete ? "on" : "new-password"}
      />
      {(error.field || error.root) && (
        <div className={style.errorIcon}>
          <ErrorIcon />
        </div>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </Box>
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
};
export type InputParams = {
  label?: string;
  isRequired?: boolean;
  type?: "text" | "password";
  autofocus?: boolean;
  autocomplete?: boolean;
};
