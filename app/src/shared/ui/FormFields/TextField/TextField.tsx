
import { FieldValues } from "react-hook-form";
import FieldContainer from "../FieldContainer";
import { FieldProps } from "@/shared/types/fields";
import { IconButton, TextField } from "@mui/material";
import { TextFieldParams } from "./TextFieldController";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
function Field<FV extends FieldValues>({
  error,
  field,
  fieldParams,
}: Props<FV>) {
// React state storing showPassword values and updating them with ShowPassword.
  const [showPassword, setShowPassword] = useState(false);

// Render the component's JSX structure.
  return (
    <FieldContainer<FV, TextFieldParams>
      error={error}
      field={field}
      fieldParams={fieldParams}
      hideErrorIcon={fieldParams?.type === "password"}
    >
      <TextField
        color={fieldParams?.color || "primary"}
        type={
          fieldParams?.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : "text"
        }
        id={field.name}
        fullWidth={true}
        helperText={
          fieldParams?.maxLength
            ? `${field.value.length}/${fieldParams?.maxLength}`
            : ""
        }
        sx={{
          padding: 0,
          "& .MuiFormHelperText-root": {
            position: "absolute",
            right: -15,
            top: -30,
          },
          "& .MuiInputBase-root": {
            borderRadius: 0,
            padding: 0,
            input: {
              padding: "0px 42px 0px 16px",
              height: 52,
            },
          },
        }}
        variant="filled"
        {...field}
        required={fieldParams?.isRequired}
        autoComplete={fieldParams?.autocomplete ? "on" : "new-password"}
        error={!!(error.field || error.root)}
        inputProps={{ maxLength: fieldParams?.maxLength }}
      />

      {fieldParams?.type === "password" && (
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          sx={{ position: "absolute", right: 8, top: 32 }}
        >
          {showPassword ? (
            <VisibilityOffOutlinedIcon />
          ) : (
            <VisibilityOutlinedIcon />
          )}
        </IconButton>
      )}
    </FieldContainer>
  );
}

export default Field;
// Type describing component props.
type Props<FV extends FieldValues> = FieldProps<FV, TextFieldParams>;
