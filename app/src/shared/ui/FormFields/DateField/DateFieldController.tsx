import { FieldValues } from "react-hook-form";

import FieldController, { FieldControllerProps } from "../FieldController";

import { default as DateField, DateFieldParams } from "./DateField";

function DateFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, DateFieldParams>) {
  // Render the component's JSX structure.
  return (
    <FieldController<FV, DateFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => (
        <DateField error={error} field={field} fieldParams={fieldParams} />
      )}
    />
  );
}

export default DateFieldController;
