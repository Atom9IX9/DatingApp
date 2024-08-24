import { useTheme } from "../../../Providers/ThemeProvider";
import { Colors, TChildren } from "../../../types/types";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler } from "react";
import React from "react";
import { stringToColor } from "../../../utils/stringToColor";

const UIIconMenuButton: React.FC<TProps> = ({
  handleClick,
  isOpen,
  children,
  title
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      <Tooltip title={title}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={isOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
        >
          {children}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UIIconMenuButton;
type TProps = {
  children: TChildren;
  handleClick: MouseEventHandler;
  isOpen: boolean;
  title: string;
};
