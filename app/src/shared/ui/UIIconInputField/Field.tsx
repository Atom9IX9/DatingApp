import { Box, InputLabel } from "@mui/material";
import classNames from "classnames";
import ErrorIcon from "@mui/icons-material/Error";
import style from "./field.module.scss";
import { FieldValues } from "react-hook-form";
import DateField from "./DateField";
import { FieldProps } from "@/shared/types/fields";
import TextInputField from "./TextInputField";


function Field<FV extends FieldValues>({
  inputParams,
  error,
  field,
}: FieldProps<FV>) {
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

      {inputParams?.type !== "date" ? (
        <TextInputField error={error} field={field} inputParams={inputParams} />
      ) : (
        <DateField field={field} error={error} inputParams={inputParams} />
      )}

      {(error.field || error.root) && !(inputParams?.type === "date") && (
        <Box className={style.errorIcon}>
          <ErrorIcon />
        </Box>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </Box>
  );
}

export default Field;

