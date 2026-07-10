import { Box } from "@mui/material";
import { cookies } from "next/headers";

import {
  onboardingStepFromCookies,
  RegisterProcess,
} from "@/processes/register";

import style from "../../../guestPages.module.scss";
import HeroBlock from "../../../HeroBlock";

// Server-rendered page component for the start page.
const SignUpPage: React.FC = async () => {
  // Render the component's JSX structure.
  const cookiesStorage = await cookies();
  const onboardingStep = cookiesStorage.get("onboardingStep")?.value;

  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPageGroup="auth" />
      <RegisterProcess
        cookiesStep={
          onboardingStep ? onboardingStepFromCookies(onboardingStep) : null
        }
      />
    </Box>
  );
};

// Server-rendered page component for the start page.
export default SignUpPage;
