
import { FieldValues } from "react-hook-form";
import FieldContainer from "../FieldContainer";
import { FieldProps } from "@/shared/types/fields";
import { TextField } from "@mui/material";
import { MultitextFieldParams } from "./MultitextFieldController";

function MultitextField<FV extends FieldValues>({
  error,
  field,
  fieldParams,
}: FieldProps<FV, MultitextFieldParams>) {
// Render the component's JSX structure.
  return (
    <FieldContainer<FV, MultitextFieldParams>
      error={error}
      field={field}
      fieldParams={fieldParams}
    >
      <TextField
        multiline
        id={field.name}
        fullWidth={true}
        rows={fieldParams?.rows || 5}
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
            padding: "20px 10px 20px 10px",
            input: {
              padding: "0px 10 0px 0",
              height: "min-content",
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

export default MultitextField;
