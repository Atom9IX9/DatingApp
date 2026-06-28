"use client";

import { useEffect } from "react";

import { TChildren } from "@/shared/types";
import { useAppDispatch } from "@/shared/lib";
import { OnboardingStep } from "@/processes/register";
import { setCurrentStep } from "@/processes/register/client";

const OnboardingStepProvider: React.FC<Props> = ({
  children,
  onboardingStep,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(onboardingStep));
  }, [dispatch, onboardingStep]);

  return <>{children}</>;
};

export default OnboardingStepProvider;
type Props = {
  onboardingStep: OnboardingStep;
  children: TChildren;
};
