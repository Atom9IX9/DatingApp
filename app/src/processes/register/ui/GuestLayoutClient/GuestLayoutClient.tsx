"use client";
import { useAppDispatch } from "@/shared/lib";
import { ReactNode, useEffect } from "react";
import { setCurrentStep } from "../../model/registerProcess.slice";
import { useRouter, usePathname } from "next/navigation";
import {
  CheckAuthResponseData,
  OnboardingStep,
  ResponseOnboardingStep,
} from "@/features/auth";
import { setUserAccountInfo, setUserAuth } from "@/entities/user";

const GuestLayoutClient = ({
  onboardingStep,
  children,
  auth,
}: {
  onboardingStep: OnboardingStep;
  children: ReactNode;
  auth: CheckAuthResponseData | undefined;
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { push } = useRouter();

  const isRegistered = onboardingStep === ResponseOnboardingStep.REGISTERED;

  useEffect(() => {
    if (auth) {
      dispatch(setUserAccountInfo(auth.user));
      dispatch(setUserAuth(auth.authCredentials));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (onboardingStep) {
      dispatch(setCurrentStep(onboardingStep));
    }
  }, [dispatch, onboardingStep]);

  useEffect(() => {
    if (!pathname) return;

    if (isRegistered && pathname !== "/home") {
      push("/home");
      return;
    }

    if (!isRegistered && pathname !== "/sign-up") {
      push("/sign-up");
    }
  }, [push, pathname, isRegistered]);

  return <>{children}</>;
};

export default GuestLayoutClient;
