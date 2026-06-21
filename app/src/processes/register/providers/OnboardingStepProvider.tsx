"use client"

import { useAppDispatch } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import { useEffect } from "react";
import { setCurrentStep } from "../model/registerProcess.slice";
import { OnboardingStep } from "../types";

const OnboardingStepProvider: React.FC<Props> = ({ children, onboardingStep }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentStep(onboardingStep));
  }, [dispatch, onboardingStep])

  return <>{children}</>;
};

export default OnboardingStepProvider;
type Props = {
  onboardingStep: OnboardingStep;
  children: TChildren
}
