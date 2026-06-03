"use client";
import style from "../guestPages.module.scss";
import { SignInForm } from "@/features/auth";
import { Box } from "@mui/material";
import HeroBlock from "../HeroBlock";
import { useAppDispatch } from "@/shared/lib";
import { setUserAccountInfo, setUserAuth } from "@/entities/user";
import { setCurrentStep } from "@/processes/register/model/registerProcess.slice";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  return (
    <Box className={`${style.mainBlock} ${style.signInPage}`}>
      <HeroBlock forPage="signInPage" />
      <SignInForm
        onSuccess={({ authCredentials, onboardingStep, user }) => {
          if (user) {
            dispatch(setUserAccountInfo(user));
          }
          dispatch(setUserAuth(authCredentials));
          dispatch(setCurrentStep(onboardingStep));
          push("/home");
        }}
      />
    </Box>
  );
};

export default SignIn;
