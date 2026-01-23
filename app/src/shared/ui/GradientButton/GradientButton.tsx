import { TChildren } from "@/shared/types";
import { Button, SxProps } from "@mui/material";
import React from "react";

const GradientButton: React.FC<Props> = ({
  children,
  color = "primary",
  textTransform = "none",
}) => {
  const hoverStylePrimary: SxProps = {
    backgroundSize: "200% ",
    backgroundPosition: "100% 50%",
    boxShadow: "none",
  };

  const primaryStyle: SxProps = {
    background: "linear-gradient(-73deg,#ff1d4a 0%, #ffb03b 100%);",
    backgroundSize: "120%",
  };

  const secondaryStyle: SxProps = {
    position: "relative",
    backgroundColor: "transparent",
    transition: "background 350ms ease",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      padding: "4px",
      borderRadius: "inherit",
      background:
        "linear-gradient(-39deg, rgba(204,0,255,1) 0%, rgba(0,255,200,1) 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },

    "& span": {
      background:
        "linear-gradient(-39deg, rgba(204,0,255,1) 0%, rgba(0,255,200,1) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "color 350ms ease",
    },
  };

  const hoverStyleSecondary: SxProps = {
    background:
      "linear-gradient(-39deg, rgba(204,0,255,1) 0%, rgba(0,255,200,1) 100%)",

    "& span": {
      WebkitTextFillColor: "#fff",
      background: "none",
    },
  };

  return (
    <Button
      variant="contained"
      sx={{
        boxShadow: "0",
        boxSizing: "border-box",
        borderRadius: "50px",
        minWidth: "152px",
        height: "48px",
        textTransform,
        ...(color === "primary" ? primaryStyle : secondaryStyle),
        fontSize: "20px",
        fontWeight: "400",
        fontFamily: "var(--font-primary)",
        transition: "all 350ms ease-in-out",
        "&:hover": {
          ...(color === "primary" ? hoverStylePrimary : hoverStyleSecondary),
          boxShadow: "none",
        },
      }}
    >
      <span>{children}</span>
    </Button>
  );
};

export default GradientButton;
type Props = {
  children: TChildren;
  color?: "primary" | "secondary";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
};
