"use client";

import { Box } from "@mui/material";

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

import { selectCurrentStep, selectStepsCount } from "../model/selectors";
import { OnboardingStep } from "../types";

import RegisterSteps from "./RegisterSteps";
import RegisterProcessForms from "./RegisterProcessForms";
import style from "./registerProcessStyle.module.scss";

const RegisterProcess: React.FC<Props> = ({ cookiesStep }) => {
  const currentStep = useAppSelector(selectCurrentStep);
  const stepsCount = useAppSelector(selectStepsCount);

  const dispatch = useAppDispatch();

  // Render the component's JSX structure.
  return (
    <Box
      className={style.registerProcessContainer}
      component="section"
      sx={{ userSelect: "none" }}
    >
      <Box className={style.registerProcess}>
        <h2>Register</h2>
        <RegisterSteps
          currentStep={currentStep || cookiesStep || 1}
          stepsCount={stepsCount}
        />
        <RegisterProcessForms
          currentStep={currentStep || cookiesStep || 1}
          formOrder={[
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
          ]}
        />
      </Box>
    </Box>
  );
};

export default RegisterProcess;
type Props = {
  cookiesStep: OnboardingStep | null;
};
