import Link from "next/link";
import NavElement from "./HeaderNavElement";
import style from "./header.module.scss"

const Header = () => {
  return (
    <header className={`${style.header} ${style.light}`}>
      <div className={style.links}>
        <Link href="/">
          <div className={`${style.logo} ${style.base2}`}>logo 180x50</div>
        </Link>
        <nav className={style.headerNav}>
          <NavElement title="home" to="/" />
          <NavElement title="users" to="/users" />
          <NavElement title="messages" to="/messages" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
