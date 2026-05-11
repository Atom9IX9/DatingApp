import { TextField } from "@mui/material";
import { FieldProps } from "../../types/fields";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

function TextInputField<FV extends FieldValues>({
  error,
  field,
  inputParams,
}: FieldProps<FV>) {
  return (
    <TextField
      id={field.name}
      fullWidth={true}
      multiline={inputParams?.type === "multilineText"}
      rows={inputParams?.rows || 5}
      helperText={inputParams?.maxLength ? `${field.value.length}/${inputParams?.maxLength}` : ""}
      sx={{
        padding: 0,
        "& .MuiFormHelperText-root": {
          position: "absolute",
          right: -15,
          top: -30,
        },
        "& .MuiInputBase-root": {
          borderRadius: 0,
          padding:
            inputParams?.type === "multilineText" ? "20px 10px 20px 10px" : 0,
          input: {
            padding:
              inputParams?.type !== "multilineText"
                ? "0px 42px 0px 16px"
                : "0px 10 0px 0",
            height: 52,
          },
        },
      }}
      variant="filled"
      {...field}
      required={inputParams?.isRequired}
      type={inputParams?.type || "text"}
      autoComplete={inputParams?.autocomplete ? "on" : "new-password"}
      error={!!(error.field || error.root)}
      inputProps={{ maxLength: inputParams?.maxLength }}
    />
  );
}

export default TextInputField;

// todo: refactor fields to have more specific components, like TextInputField, DateInputField, etc. and move type-specific logic there. This will make the code cleaner and more maintainable
