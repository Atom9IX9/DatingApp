"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { setUserAccountInfo, setUserAuth } from "@/entities/user";
import { setCurrentStep } from "@/processes/register/client";
import { SignInForm } from "@/features/auth";
import { setAvatar } from "@/entities/avatar/client";
import { useAppDispatch } from "@/shared/lib";

import HeroBlock from "../../../HeroBlock";
import style from "../../../guestPages.module.scss";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  // Render the component's JSX structure.
  return (
    <Box className={`${style.mainBlock} ${style.signInPage}`}>
      <HeroBlock forPage="signInPage" />
      <SignInForm
        onSuccess={({ authCredentials, onboardingStep, user }) => {
          if (user) {
            dispatch(setUserAccountInfo(user));
          }
          dispatch(setUserAuth(authCredentials));
          if (user?.avatar) dispatch(setAvatar(user?.avatar));
          dispatch(setCurrentStep(onboardingStep));
          push("/home");
        }}
      />
    </Box>
  );
};

export default SignIn;
