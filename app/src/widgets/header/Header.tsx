"use client";

import style from "./header.module.scss";
import { useTheme } from "@/shared";
import cn from "classnames";
import HeaderNav from "./HeaderNav/HeaderNav";
import UserActions from "./UserActions/UserActions";
import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      variant="outlined"
      className={cn(style.header, style[theme])}
      sx={{bgcolor: "info.dark"}}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <HeaderNav />
        <UserActions />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
