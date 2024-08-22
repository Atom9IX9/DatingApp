import Link from "next/link"
import NavElement from "./HeaderNavElement"
import { Colors } from "@/types/types";
import style from "@/components/Header/header.module.scss";
import cn from "classnames";


const HeaderNav = () => {
  return (
    <div className={style.links}>
        <Link href="/">
          <div className={cn(style.logo, style[Colors.Secondary])}>logo 180x50</div>
        </Link>
        <nav className={style.headerNav}>
          <NavElement title="home" to="/" />
          <NavElement title="users" to="/users" />
          <NavElement title="messages" to="/messages" />
        </nav>
      </div>
  )
} 

export default HeaderNav