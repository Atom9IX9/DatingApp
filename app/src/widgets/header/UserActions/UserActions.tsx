import style from "../header.module.scss";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import AppSettingsMenu from "./AppSettingsMenu";
import { Box } from "@mui/material";
import { useAuth } from "@/features";

const UserActions = () => {
  const auth = useAuth();

  return (
    <Box display="flex" className={style.userActions}>
      <div className={style.loginBlock}>
        {!auth ? (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        ) : (
          <Link className={style.userNameLink} href="/profile">
            {auth.firstName} {auth.lastName}
          </Link>
        )}
      </div>
      <AccountMenu />
      <AppSettingsMenu />
    </Box>
  );
};

export default UserActions;
