import Link from "next/link";
import { Box } from "@mui/material";

import { useAuth } from "@/features/auth";

import style from "../header.module.scss";

import AppSettingsMenu from "./AppSettingsMenu";
import AccountMenu from "./AccountMenu";

const UserActions = () => {
  const auth = useAuth();

  // Render the component's JSX structure.
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
