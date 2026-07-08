"use client";

import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/shared/lib";
import { ResponseOnboardingStep } from "@/features/auth";

import { OnboardingStep } from "../types";
import { setCurrentStep } from "../model/registerProcess.slice";

const RegisterProcessForms: React.FC<Props> = ({ currentStep, formOrder }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleStepSuccess = () => {
    const newStep = Number(currentStep) + 1;
    dispatch(setCurrentStep(newStep));
    Cookies.set("onboardingStep", String(newStep), { expires: 1 });
  };

  const handleLastStepSuccess = () => {
    dispatch(setCurrentStep(ResponseOnboardingStep.REGISTERED));
    Cookies.set("onboardingStep", "registered", { expires: 1 });
    push("/home");
  };

  for (let i = 0; i < formOrder.length; i++) {
    if (Number.isInteger(currentStep) && +currentStep - 1 === i) {
      const currentForm = formOrder[i];

      return React.cloneElement(currentForm, {
        onSuccess: (data: any) => {
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
  formOrder: React.ReactElement<{ onSuccess: (data: any) => void }>[];
};
