import { Box } from "@mui/material";

import { SignInForm } from "@/features/auth";

import HeroBlock from "../../../HeroBlock";
import style from "../../../guestPages.module.scss";

const SignIn = () => {
  // Render the component's JSX structure.
  return (
    <Box className={`${style.mainBlock} ${style.signInPage}`}>
      <HeroBlock forPageGroup="auth" />
      <SignInForm />
    </Box>
  );
};

export default SignIn;
