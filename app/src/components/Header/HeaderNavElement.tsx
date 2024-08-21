"use client"

import Link from "next/link";
import style from "./header.module.scss"
import { usePathname } from "next/navigation";

const NavElement: React.FC<TProps> = ({ title, to }) => {
  const pathname = usePathname()

  return (
    <Link href={to} className={`${style.navElement} ${pathname === to ? style.active : ''}`}>
      <p>{title.toUpperCase()}</p>
    </Link>
  );
};

export default NavElement;
type TProps = {
  title: string;
  to: string;
};
