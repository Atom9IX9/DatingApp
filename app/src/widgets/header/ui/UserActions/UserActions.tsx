import Link from "next/link";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import style from "../header.module.scss";

import AppSettingsMenu from "./AppSettingsMenu";
import AccountMenu from "./AccountMenu";

const UserActions = () => {
  const { data } = useSession();

  // Render the component's JSX structure.
  return (
    <Box display="flex" className={style.userActions}>
      <div className={style.loginBlock}>
        {!data?.user ? (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        ) : (
          <Link className={style.userNameLink} href="/profile">
            {data?.user.firstName} {data?.user.lastName}
          </Link>
        )}
      </div>
      <AccountMenu />
      <AppSettingsMenu />
    </Box>
  );
};

export default UserActions;
