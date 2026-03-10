import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import style from "./radioGroup.module.scss";
import { useState } from "react";
import { Sex } from "../../../features/auth/signUp/types/form";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Colors } from "@/shared/types";

const RadioItem: React.FC<RadioItemProps> = ({
  item: { bgColor, text, value },
}) => {
  return (
    <FormControlLabel control={<Radio />} label={text} value={value} className={style.radioItem} sx={{ bgcolor: bgColor }} />
  );
};

function RadioGroupUI<FV extends FieldValues>({
  field,
  fieldState,
  items,
}: Props<FV>) {
  const mappedItems = items.map((item, index) => (
    <RadioItem item={item} key={index} />
  ));

  return <RadioGroup className={style.radioGropContainer}>{mappedItems}</RadioGroup>;
}

export default RadioGroupUI;
type Props<FV extends FieldValues> = {
  field: ControllerRenderProps<FV, Path<FV>>;
  fieldState: ControllerFieldState;
  items: RadioItem[];
};

type RadioItemProps = {
  item: RadioItem;
};

export type RadioItem = {
  text: string;
  bgColor: Colors;
  value: string;
};
