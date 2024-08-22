"use client";

import Link from "next/link";
import style from "../header.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { Colors } from "@/types/types";

const NavElement: React.FC<TProps> = ({ title, to }) => {
  const pathname = usePathname();

  return (
    <Link
      href={to}
      className={cn(style.navElement, {
        [style[Colors.Active]]: pathname === to,
      })}
    >
      <p>{title.toUpperCase()}</p>
    </Link>
  );
};

export default NavElement;
type TProps = {
  title: string;
  to: string;
};
