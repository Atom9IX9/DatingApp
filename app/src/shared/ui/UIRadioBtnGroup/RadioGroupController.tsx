"use client"

import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Box } from "@mui/material";

import style from "./radioGroup.module.scss";
import RadioGroupUI, { RadioItem } from "./RadioGroup";

function RadioGroupController<FV extends FieldValues>({
  control,
  name,
  items, 
  required
}: Props<FV>) {
// Render the component's JSX structure.
  return (
    <Box className={style.radioGroupContainer}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <RadioGroupUI
            field={field}
            fieldState={fieldState}
            items={items}
            required={required}
          />
        )}
      />
    </Box>
  );
}

export default RadioGroupController;
// Type describing component props.
type Props<V extends FieldValues> = {
  control: Control<V>;
  name: FieldPath<V>;
  items: RadioItem[];
  required?: boolean;
};

