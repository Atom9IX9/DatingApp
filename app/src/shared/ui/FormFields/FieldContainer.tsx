
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
  hideErrorIcon,
}: Props<FV, P>) {
// Render the component's JSX structure.
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

      {(error.field || error.root) && !hideErrorIcon && (
        <Box className={style.errorIcon}>
          <ErrorIcon />
        </Box>
      )}
      <div className={style.fieldError}>{error.field}</div>
    </Box>
  );
}

export default FieldContainer;
// Type describing component props.
type Props<FV extends FieldValues, P> = FieldProps<FV, P> & {
  children?: React.ReactNode;
  hideErrorIcon?: boolean;
};
