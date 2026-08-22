"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { OnboardingStep } from "@/shared/types";

const RegisterProcessForms: React.FC<Props> = ({ currentStep, formOrder }) => {
  const { replace } = useRouter();

  const { update } = useSession();

  const handleLastStepSuccess = () => {
    replace("/home");
  };

  for (let i = 0; i < formOrder.length; i++) {
    if (Number.isInteger(currentStep) && +currentStep - 1 === i) {
      const currentForm = formOrder[i];

      return React.cloneElement(currentForm, {
        onSuccess: async (data: unknown) => {
          if (currentForm.props.onSuccess) {
            // actions from children
            await currentForm.props.onSuccess(data);
          }

          // base onSuccess behavior
          if (i === formOrder.length - 1) {
            handleLastStepSuccess();
          }

          // session update after each step to ensure the latest user data is available
          await update();
        },
      });
    }
  }
};

export default RegisterProcessForms;
// Type describing component props.
type Props = {
  currentStep: OnboardingStep;
  formOrder: React.ReactElement<{
    onSuccess: (data: unknown) => void | Promise<void>;
  }>[];
};
