import {
  Box,
  FormControlLabel,
  Palette,
  Radio,
  RadioGroup,
  styled,
  useTheme,
} from "@mui/material";
import style from "./radioGroup.module.scss";
import { useState } from "react";
import { Sex } from "../../../features/auth/signUp/types/form";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { PaletteColors, PaletteShade, ThemeColor } from "@/shared/types";

const BpIcon = styled("span")(() => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  border: "1px solid #ffffff",
  backgroundColor: "transparent",
}));

const BpCheckedIcon = styled(BpIcon, {
  shouldForwardProp: (prop) => prop !== "markerBgColor",
})<BpCheckedIconProps>(({ theme, markerBgColor }) => {
  const themeColorParams = markerBgColor?.split(".") as [
    PaletteColors,
    PaletteShade,
  ];

  const color = themeColorParams
    ? theme.palette[themeColorParams[0]][themeColorParams[1]]
    : null;

  return {
    backgroundColor: "#ffffff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 20,
      height: 20,
      background: `radial-gradient(${color || "#B650F1"}, ${color || "#B650F1"} 28%,transparent 32%)`,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#ffffff",
    },
  };
});

const RadioItem: React.FC<RadioItemProps> = ({
  item: { bgColor, text, value },
}) => {
  return (
    <FormControlLabel
      control={
        <Radio
          icon={<BpIcon />}
          checkedIcon={<BpCheckedIcon markerBgColor={bgColor} />}
        />
      }
      label={<Box sx={{ fontFamily: "var(--font-primary)" }}>{text}</Box>}
      value={value}
      className={style.radioItem}
      sx={(theme) => ({
        bgcolor: bgColor || "#B650F1",
        borderRadius: "10px",
        width: 105,
        height: 42,
        fontFamily: "var(--font-primary)",
      })}
    />
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

  return (
    <RadioGroup
      value={field.value || ""}
      onChange={(e) => field.onChange(e.target.value)}
      className={style.radioGropContainer}
    >
      {mappedItems}
    </RadioGroup>
  );
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
  bgColor?: ThemeColor;
  value: string;
};

type BpCheckedIconProps = {
  markerBgColor?: ThemeColor;
};
