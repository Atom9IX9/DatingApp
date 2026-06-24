import { FieldValues } from "react-hook-form";

import FieldController, { FieldControllerProps } from "../FieldController";

import TagsField, { TagsFieldParams } from "./TagsField";

function TagsFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, TagsFieldParams>) {
  // Render the component's JSX structure.
  return (
    <FieldController<FV, TagsFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => (
        <TagsField error={error} field={field} fieldParams={fieldParams} />
      )}
    />
  );
}

export default TagsFieldController;
