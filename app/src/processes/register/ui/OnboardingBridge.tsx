"use client";

import { useEffect } from "react";

import { TChildren } from "@/shared/types";
import { useAppDispatch } from "@/shared/lib";

import { setCurrentStep } from "../model/registerProcess.slice";
import { OnboardingStep } from "../types/index";

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
