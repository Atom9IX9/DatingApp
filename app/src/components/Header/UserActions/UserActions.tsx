import style from "@/components/Header/header.module.scss";
import Link from "next/link";

const UserActions = () => {
  return (
    <div className={style.userActions}>
      <div className={style.loginBlock}>
        <Link className="" href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
    </div>
  );
};

export default UserActions;
