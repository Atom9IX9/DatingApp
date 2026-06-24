"use client";

import { FieldValues } from "react-hook-form";

import FieldController, { FieldControllerProps } from "../FieldController";

import { default as TextField, TextFieldParams } from "./TextField";

function TextFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, TextFieldParams>) {
  // Render the component's JSX structure.
  return (
    <FieldController<FV, TextFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => (
        <TextField error={error} field={field} fieldParams={fieldParams} />
      )}
    />
  );
}

export default TextFieldController;
