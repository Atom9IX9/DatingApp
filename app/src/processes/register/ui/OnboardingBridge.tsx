"use client";

import { useEffect } from "react";

import { TChildren } from "@/shared/types";
import { useAppDispatch } from "@/shared/lib";
import { OnboardingStep } from "@/shared/types";

import { setCurrentStep } from "../model/registerProcess.slice";

const OnboardingBridge: React.FC<Props> = ({ children, onboardingStep }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(onboardingStep));
  }, [dispatch, onboardingStep]);

  return <>{children}</>;
};

export default OnboardingBridge;
type Props = {
  onboardingStep: OnboardingStep;
  children: TChildren;
};
