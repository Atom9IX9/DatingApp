"use client";

import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

import { Colors, TChildren } from "@/shared/types";

import style from "../header.module.scss";

const NavElement: React.FC<TProps> = ({
  title,
  to,
  children,
  color = "default",
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Render the component's JSX structure.
  return (
    <Tooltip title={title}>
      <IconButton
        color={color}
        className={cn(style.navElement, {
          [style[Colors.Active]]: pathname === to,
        })}
        onClick={() => {
          router.push(to);
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default NavElement;
// Props type for the T component.
type TProps = {
  title: string;
  to: string;
  children: TChildren;
  color?: "secondary" | "primary" | "default";
};
