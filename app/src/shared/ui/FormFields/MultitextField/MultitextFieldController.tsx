import { FieldValues } from "react-hook-form";
import FieldController, { FieldControllerProps } from "../FieldController";
import { default as MultitextField } from "./MultitextField";
import { BasicFieldParams } from "../../../types/fields";

function MultitextFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, MultitextFieldParams>) {
  return (
    <FieldController<FV, MultitextFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => <MultitextField error={error} field={field} fieldParams={fieldParams} />}
    />
  );
}

export default MultitextFieldController;
export type MultitextFieldParams = BasicFieldParams<{
  maxLength?: number;
  rows?: number;
}>;
