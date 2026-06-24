"use client";

import cn from "classnames";
import { AppBar, Toolbar } from "@mui/material";

import { useTheme } from "@/shared/lib";

import style from "./header.module.scss";
import HeaderNav from "./HeaderNav/HeaderNav";
import UserActions from "./UserActions/UserActions";

const Header = () => {
  const theme = useTheme();

  // Render the component's JSX structure.
  return (
    <AppBar
      position="static"
      variant="outlined"
      className={cn(style.header, style[theme])}
      sx={{ bgcolor: "info.dark" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <HeaderNav />
        <UserActions />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
