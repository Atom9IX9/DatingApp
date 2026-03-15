import { TextField } from "@mui/material";
import { FieldProps } from "../../types/fields";
import { FieldValues } from "react-hook-form";

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
      rows={5}
      sx={{
        padding: 0,
        "& .MuiInputBase-root": {
          borderRadius: 0,
          padding: inputParams?.type === "multilineText" ? "20px 10px 20px 10px" : 0,
          input: {
            padding: inputParams?.type !== "multilineText" ? "0px 42px 0px 16px" : "0px 10 0px 0",
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
    />
  );
}

export default TextInputField
