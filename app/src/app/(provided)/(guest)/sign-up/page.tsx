import { Box } from "@mui/material";

import { RegisterProcess } from "@/processes/register";
import { auth } from "@/auth";

import style from "../../../guestPages.module.scss";
import HeroBlock from "../../../HeroBlock";

// Server-rendered page component for the start page.
const SignUpPage: React.FC = async () => {
  const session = await auth();

  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPageGroup="auth" />
      <RegisterProcess onboardingStep={session?.user.onboardingStep} />
    </Box>
  );
};

// Server-rendered page component for the start page.
export default SignUpPage;
