"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

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
import { useAppDispatch } from "@/shared/lib";
import { setAvatar } from "@/entities/avatar";
import { ResponseOnboardingStep } from "@/features/auth/types/types";

import { OnboardingStep } from "../types";
import { setCurrentStep } from "../model/registerProcess.slice";

const RegisterProcessForms: React.FC<Props> = ({ currentStep }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const nextStep = () => {
    if (currentStep !== ResponseOnboardingStep.REGISTERED) {
      const newStep = currentStep + 1;
      dispatch(setCurrentStep(newStep));
      Cookies.set("onboardingStep", String(newStep));
    }
  };

  switch (currentStep) {
    case 1:
      // Render the component's JSX structure.
      return (
        <CredentialsForm
          onSuccess={({ auth: { authId, email } }) => {
            dispatch(setUserAuth({ email, authId }));
            nextStep();
          }}
        />
      );
    case 2:
      // Render the component's JSX structure.
      return (
        <RegisterUserPersonalInfoForm
          onSuccess={(data) => {
            dispatch(registerUserPersonalInfo(data));
            nextStep();
          }}
        />
      );
    case 3:
      // Render the component's JSX structure.
      return (
        <DescriptionForm
          onSuccess={(data) => {
            dispatch(setUserDescription(data));
            nextStep();
          }}
        />
      );
    case 4:
      // Render the component's JSX structure.
      return (
        <Box sx={{ mt: "31px" }}>
          <AvatarUploadForm
            onSuccess={(data) => {
              dispatch(setAvatar(data));
              dispatch(setCurrentStep(ResponseOnboardingStep.REGISTERED));
              Cookies.set("onboardingStep", "registered");
              push("/home");
            }}
          />
        </Box>
      );
  }
};

export default RegisterProcessForms;
// Type describing component props.
type Props = {
  currentStep: OnboardingStep;
};
