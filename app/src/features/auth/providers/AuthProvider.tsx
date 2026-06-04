"use client";
import {
  setUserAuth,
  setUserAccountInfo,
  UserAccountInfo,
} from "@/entities/user";
import { useEffect } from "react";
import { createContext } from "react";
import { useAppDispatch } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import { setAvatar } from "@/entities/avatar";
import { CheckAuthResponseData, OnboardingStep } from "../types";
import { setCurrentStep } from "@/processes/register/model/registerProcess.slice";

export const AuthContext = createContext<UserAccountInfo | null>(null);

const AuthProvider: React.FC<ProviderProps> = ({
  children,
  auth,
  onboardingStep,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (onboardingStep) {
      dispatch(setCurrentStep(onboardingStep));
    }
    if (auth) {
      dispatch(setUserAuth(auth.authCredentials));
      if (auth.user) {
        dispatch(setUserAccountInfo(auth.user));
        if (auth.user.avatar) {
          dispatch(setAvatar(auth.user.avatar));
        }
      }
    }
  }, [dispatch, auth, onboardingStep]);

  return (
    <AuthContext.Provider value={auth ? auth.user : null}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  auth: CheckAuthResponseData | undefined;
  onboardingStep?: OnboardingStep;
};
