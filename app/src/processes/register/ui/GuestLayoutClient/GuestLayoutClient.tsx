"use client";
import { useAppDispatch } from "@/shared/lib";
import { ReactNode, useEffect } from "react";
import { setCurrentStep } from "../../model/registerProcess.slice";
import { redirect, usePathname } from "next/navigation";
import { CheckAuthResponseData } from "@/features/auth";
import { setUserAccountInfo, setUserAuth } from "@/entities/user";

const GuestLayoutClient = ({
  onboardingStep,
  children,
  auth,
}: {
  onboardingStep: number;
  children: ReactNode;
  auth: CheckAuthResponseData | undefined;
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

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
    if (onboardingStep > 4) {
      // todo: isRegisterCompleted;
      redirect("/users");
    }
  }, [redirect]);

  useEffect(() => {
    if (pathname !== "/sign-up" && onboardingStep) {
      redirect("/sign-up");
    }
  }, [redirect, pathname, redirect, onboardingStep]);

  return <>{(!onboardingStep || pathname === "/sign-up") && children}</>;
};

export default GuestLayoutClient;
