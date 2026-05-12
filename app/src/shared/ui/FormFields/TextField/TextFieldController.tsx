import { FieldValues } from "react-hook-form";
import FieldController, { FieldControllerProps } from "../FieldController";
import { default as TextField } from "./TextField";
import { BasicFieldParams } from "../../../types/fields";

function TextFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, TextFieldParams>) {
  return (
    <FieldController<FV, TextFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => <TextField error={error} field={field} fieldParams={fieldParams} />}
    />
  );
}

export default TextFieldController;
export type TextFieldParams = BasicFieldParams<{
  maxLength?: number;
  type?: "text" | "password"; 
}>;
