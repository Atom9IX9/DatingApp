import style from "@/components/Header/header.module.scss";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import AppSettingsMenu from "./AppSettingsMenu";

const UserActions = () => {
  return (
    <div className={style.userActions}>
      <div className={style.loginBlock}>
        <Link className="" href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
      <AccountMenu />
      <AppSettingsMenu />
    </div>
  );
};

export default UserActions;
