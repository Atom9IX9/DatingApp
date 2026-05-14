import { FieldValues } from "react-hook-form";
import FieldController, { FieldControllerProps } from "../FieldController";
import TagsField, { default as TextField } from "./TagsField";
import { BasicFieldParams } from "../../../types/fields";

function TagsFieldController<FV extends FieldValues>({
  control,
  name,
  rootError,
  validate,
  fieldParams,
}: FieldControllerProps<FV, TagsFieldParams>) {
  return (
    <FieldController<FV, TagsFieldParams>
      control={control}
      name={name}
      rootError={rootError}
      validate={validate}
      onRender={(error, field) => <TagsField error={error} field={field} fieldParams={fieldParams} />}
    />
  );
}

export default TagsFieldController;
export type TagsFieldParams = BasicFieldParams<{
  maxTagLength?: number;
  maxTagsCount?: number;
}>;
