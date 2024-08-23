import { Menu, PopoverVirtualElement } from "@mui/material";
import { TChildren } from "../../../types/types";
import React, { MouseEventHandler } from "react"

const UIMenu: React.FC<TProps> = ({ children, anchorEl, isOpen, handleClose, theme }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isOpen}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          backgroundColor: theme === "dark" ? "#5d5e59" : "#ffffff",
          color: theme === "dark" ? "#fff" : "#000",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            backgroundColor: theme === "dark" ? "#5d5e59" : "#ffffff",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      { children }
    </Menu>
  );
};

export default UIMenu;
type TProps = {
  children: TChildren;
  anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined;
  isOpen: boolean;
  handleClose: MouseEventHandler<HTMLDivElement>;
  theme: "dark" | "light"
};
