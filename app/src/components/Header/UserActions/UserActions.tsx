import style from "@/components/Header/header.module.scss";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import AppSettingsMenu from "./AppSettingsMenu";
import { useAuth } from "@/Providers/AuthProvider";

const UserActions = () => {
  const auth = useAuth();

  return (
    <div className={style.userActions}>
      <div className={style.loginBlock}>
        {!auth ? (
          <>
            <Link className="" href="/sign-in">
              Sign in
            </Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        ) : (
          auth.getUsername()
        )}
      </div>
      <AccountMenu />
      <AppSettingsMenu />
    </div>
  );
};

export default UserActions;
