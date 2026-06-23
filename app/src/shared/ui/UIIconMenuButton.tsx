import { Box, IconButton, Tooltip } from "@mui/material";
import React, { MouseEventHandler } from "react";

import { TChildren } from "../types";

// Button component used for an action in src\shared\ui\UIIconMenuButton.tsx.
const UIIconMenuButton: React.FC<TProps> = ({
  handleClick,
  isOpen,
  children,
  title,
}) => {
// Render the component's JSX structure.
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

// Button component for a user action in src\shared\ui\UIIconMenuButton.tsx.
export default UIIconMenuButton;
// Props type for the T component.
type TProps = {
  children: TChildren;
  handleClick: MouseEventHandler;
  isOpen: boolean;
  title: string;
};
