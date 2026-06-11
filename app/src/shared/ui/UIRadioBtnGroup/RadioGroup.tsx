
"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Palette,
  Radio,
  RadioGroup,
  styled,
  useTheme,
} from "@mui/material";
import style from "./radioGroup.module.scss";
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
// Render the component's JSX structure.
  return (
    <FormControlLabel
      control={
        <Radio
          icon={<BpIcon />}
          checkedIcon={<BpCheckedIcon markerBgColor={bgColor} />}
        />
      }
      label={<Box sx={{ fontFamily: "var(--font-primary)", marginLeft: "-3px" }}>{text}</Box>}
      value={value}
      className={style.radioItem}
      sx={(theme) => ({
        bgcolor: bgColor || "#B650F1",
        borderRadius: "10px",
        width: 105,
        height: 42,
        fontFamily: "var(--font-primary)",
        margin: 0,
      })}
    />
  );
};

function RadioGroupUI<FV extends FieldValues>({
  field,
  fieldState,
  items,
  required
}: Props<FV>) {
  const mappedItems = items.map((item, index) => (
    <RadioItem item={item} key={index} />
  ));

// Render the component's JSX structure.
  return (
    <FormControl required={required}>
      <FormLabel
        sx={{
          color: "#ffffff",
          fontSize: 14,
          marginBottom: "7px",
          fontWeight: 600,
          fontFamily: "var(--font-primary)",
          "&.Mui-focused": {
            color: "#ffffff",
          },
        }}
        
        htmlFor={field.name}
      >
        Sex
      </FormLabel>
      <RadioGroup
        row
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
        className={style.radioGroupContainer}
        sx={{ flexWrap: "nowrap" }}
      >
        {mappedItems}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupUI;
// Type describing component props.
type Props<FV extends FieldValues> = {
  field: ControllerRenderProps<FV, Path<FV>>;
  fieldState: ControllerFieldState;
  items: RadioItem[];
  required?: boolean;
};

// Props type for the RadioItem component.
type RadioItemProps = {
  item: RadioItem;
};

// Exported type alias used for typing shared data shapes.
export type RadioItem = {
  text: string;
  bgColor?: ThemeColor;
  value: string;
};

// Props type for the BpCheckedIcon component.
type BpCheckedIconProps = {
  markerBgColor?: ThemeColor;
};
