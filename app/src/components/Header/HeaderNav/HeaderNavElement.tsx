"use client";

import Link from "next/link";
import style from "../header.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { Colors, TChildren } from "@/types/types";
import { IconButton, Tooltip } from "@mui/material";

const NavElement: React.FC<TProps> = ({
  title,
  to,
  children,
  color = "default",
}) => {
  const pathname = usePathname();

  return (
    <Tooltip title={title}>
      <IconButton
        color={color}
        href={to}
        className={cn(style.navElement, {
          [style[Colors.Active]]: pathname === to,
        })}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default NavElement;
type TProps = {
  title: string;
  to: string;
  children: TChildren;
  color?: "secondary" | "primary" | "default"
};
