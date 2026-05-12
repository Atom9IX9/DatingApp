import { Box, InputLabel } from "@mui/material";
import classNames from "classnames";
import ErrorIcon from "@mui/icons-material/Error";
import style from "./field.module.scss";
import { FieldValues } from "react-hook-form";
import { FieldProps } from "@/shared/types/fields";

function FieldContainer<FV extends FieldValues, P>({
  fieldParams,
  error,
  field,
  children,
}: FieldProps<FV, P> & { children?: React.ReactNode }) {
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
        {fieldParams?.label}
      </InputLabel>
      <Box>{children}</Box>
      {/* {inputParams?.type !== "date" ? (
        <TextInputField error={error} field={field} inputParams={inputParams} />
      ) : (
        <DateField field={field} error={error} inputParams={inputParams} />
      )}*/}

      {(error.field || error.root) && (
        <Box className={style.errorIcon}>
          <ErrorIcon />
        </Box>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </Box>
  );
}

export default FieldContainer;
