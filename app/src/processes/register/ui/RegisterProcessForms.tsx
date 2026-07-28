"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/shared/lib";
import { OnboardingStep, ResponseOnboardingStep } from "@/shared/types";

import { setCurrentStep } from "../model/registerProcess.slice";

const RegisterProcessForms: React.FC<Props> = ({ currentStep, formOrder }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleStepSuccess = () => {
    const newStep = Number(currentStep) + 1;
    dispatch(setCurrentStep(newStep));
  };

  const handleLastStepSuccess = () => {
    dispatch(setCurrentStep(ResponseOnboardingStep.REGISTERED));
    push("/home");
  };

  for (let i = 0; i < formOrder.length; i++) {
    if (Number.isInteger(currentStep) && +currentStep - 1 === i) {
      const currentForm = formOrder[i];

      return React.cloneElement(currentForm, {
        onSuccess: (data: unknown) => {
          if (currentForm.props.onSuccess) {
            // actions from children
            currentForm.props.onSuccess(data);
          }
          // base onSoccess behavior
          if (i === formOrder.length - 1) {
            handleLastStepSuccess();
          } else {
            handleStepSuccess();
          }
        },
      });
    }
  }
};

export default RegisterProcessForms;
// Type describing component props.
type Props = {
  currentStep: OnboardingStep;
  formOrder: React.ReactElement<{ onSuccess: (data: unknown) => void }>[];
};
