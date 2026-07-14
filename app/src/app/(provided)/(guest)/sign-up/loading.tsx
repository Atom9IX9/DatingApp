import { Box } from "@mui/material";

import { OnboardingBridge, RegisterProcess } from "@/processes/register";

import style from "../../../guestPages.module.scss";
import HeroBlock from "../../../HeroBlock";

// Server-rendered page component for the start page.
const Loading: React.FC = () => {
  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPageGroup="auth" />
      <OnboardingBridge onboardingStep={1}>
        <RegisterProcess />
      </OnboardingBridge>
    </Box>
  );
};

// Server-rendered page component for the start page.
export default Loading;
