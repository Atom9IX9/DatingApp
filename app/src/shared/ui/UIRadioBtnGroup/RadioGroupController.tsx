"use client"

import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import style from "./radioGroup.module.scss";
import { Box } from "@mui/material";
import RadioGroupUI, { RadioItem } from "./RadioGroup";
import { Colors } from "@/shared/types";

function RadioGroupController<FV extends FieldValues>({
  control,
  name,
  items
}: Props<FV>) {
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
          />
        )}
      />
    </Box>
  );
}

export default RadioGroupController;
type Props<V extends FieldValues> = {
  control: Control<V>;
  name: FieldPath<V>;
  items: RadioItem[]
};

