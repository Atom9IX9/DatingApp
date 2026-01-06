"use client";

import Link from "next/link";
import style from "../header.module.scss";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";
import { Colors } from "@/shared";
import { IconButton, Tooltip } from "@mui/material";
import { TChildren } from "@/shared";

const NavElement: React.FC<TProps> = ({
  title,
  to,
  children,
  color = "default",
}) => {
  const pathname = usePathname();
  const router = useRouter();

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
type TProps = {
  title: string;
  to: string;
  children: TChildren;
  color?: "secondary" | "primary" | "default";
};
