import style from "../guestPages.module.scss";
import { SignInForm } from "@/features/auth";
import { Box } from "@mui/material";
import classNames from "classnames";
import HeroBlock from "../HeroBlock";

const SignIn = () => {
  return (
    <Box className={`${style.mainBlock} ${style.signInPage}`}>
      <HeroBlock forPage="signInPage" />
      <SignInForm />
    </Box>
  );
};

export default SignIn;
