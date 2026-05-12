import { FieldValues } from "react-hook-form";
import FieldContainer from "../FieldContainer";
import { FieldProps } from "@/shared/types/fields";
import { TextField } from "@mui/material";
import { TextFieldParams } from "./TextFieldController";

function Field<FV extends FieldValues>({
  error,
  field,
  fieldParams,
}: FieldProps<FV, TextFieldParams>) {
  return (
    <FieldContainer<FV, TextFieldParams>
      error={error}
      field={field}
      fieldParams={fieldParams}
    >
      <TextField
        type={fieldParams?.type}
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
    </FieldContainer>
  );
}

export default Field;
