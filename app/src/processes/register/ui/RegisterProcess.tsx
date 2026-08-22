"use client";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/lib";
import {
  CredentialsForm,
  DescriptionForm,
  RegisterUserPersonalInfoForm,
} from "@/features/auth";
import {
  registerUserPersonalInfo,
  setUserAuth,
  setUserDescription,
} from "@/entities/user";
import { AvatarUploadForm } from "@/features/avatarCustomization";
import { setAvatar } from "@/entities/avatar/client";
import {
  ClientOnboardingStep,
  OnboardingStep,
  ResponseOnboardingStep,
} from "@/shared/types";

import { selectStepsCount } from "../model/selectors";

import RegisterSteps from "./RegisterSteps";
import RegisterProcessForms from "./RegisterProcessForms";
import style from "./registerProcessStyle.module.scss";

const RegisterProcess: React.FC<Props> = ({ onboardingStep }) => {
  const stepsCount = useAppSelector(selectStepsCount);

  const dispatch = useAppDispatch();

  const { data } = useSession();

  const currentStep =
    data?.user.onboardingStep ??
    onboardingStep ??
    ClientOnboardingStep.CREDENTIALS;

  const renderStep =
    currentStep === ResponseOnboardingStep.REGISTERED
      ? ResponseOnboardingStep.AVATAR
      : currentStep;

  const formOrder = useMemo(
    () => [
      <CredentialsForm
        key={1}
        onSuccess={({ auth: { authId, email } }) => {
          dispatch(setUserAuth({ email, authId }));
        }}
      />,
      <RegisterUserPersonalInfoForm
        key={2}
        onSuccess={(data) => {
          dispatch(registerUserPersonalInfo(data));
        }}
      />,
      <DescriptionForm
        key={3}
        onSuccess={(data) => {
          dispatch(setUserDescription(data));
        }}
      />,
      <AvatarUploadForm
        key={4}
        onSuccess={(data) => {
          dispatch(setAvatar(data));
        }}
        sx={{ mt: "31px" }}
      />,
    ],
    [dispatch],
  );

  // Render the component's JSX structure.
  return (
    <Box
      className={style.registerProcessContainer}
      component="section"
      sx={{ userSelect: "none" }}
    >
      <Box className={style.registerProcess}>
        <h2>Register</h2>
        <RegisterSteps currentStep={renderStep} stepsCount={stepsCount} />
        <RegisterProcessForms currentStep={renderStep} formOrder={formOrder} />
      </Box>
    </Box>
  );
};

export default RegisterProcess;
type Props = {
  onboardingStep?: OnboardingStep;
};
