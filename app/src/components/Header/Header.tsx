"use client";

import style from "./header.module.scss";
import { useTheme } from "@/Providers/ThemeProvider";
import cn from "classnames";
import HeaderNav from "./HeaderNav/HeaderNav";
import UserActions from "./UserActions/UserActions";

const Header = () => {
  const theme = useTheme();

  return (
    <header className={cn(style.header, style[theme])}>
      <HeaderNav />
      <UserActions />
    </header>
  );
};

export default Header;
