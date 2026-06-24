import { FieldValues } from "react-hook-form";

import FieldController, { FieldControllerProps } from "../FieldController";

import {
  default as MultitextField,
  MultitextFieldParams,
} from "./MultitextField";

function MultitextFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, MultitextFieldParams>) {
  // Render the component's JSX structure.
  return (
    <FieldController<FV, MultitextFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => (
        <MultitextField error={error} field={field} fieldParams={fieldParams} />
      )}
    />
  );
}

export default MultitextFieldController;
