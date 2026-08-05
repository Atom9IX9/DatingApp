import { Box } from "@mui/material";

import { RegisterProcess } from "@/processes/register";

import style from "../../../guestPages.module.scss";
import HeroBlock from "../../../HeroBlock";

// Server-rendered page component for the start page.
const SignUpPage: React.FC = () => {
  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPageGroup="auth" />
      <RegisterProcess onboardingStep={1} />
    </Box>
  );
};

// Server-rendered page component for the start page.
export default SignUpPage;
