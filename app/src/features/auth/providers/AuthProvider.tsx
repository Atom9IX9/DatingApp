"use client";
import {
  setUserAuth,
  setUserAccountInfo,
  UserAccountInfo,
  selectUser,
} from "@/entities/user";
import { useEffect } from "react";
import { createContext } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import { selectAvatar, setAvatar } from "@/entities/avatar";
import { CheckAuthResponseData, OnboardingStep } from "../types";
import { setCurrentStep } from "@/processes/register/model/registerProcess.slice";

export const AuthContext = createContext<UserAccountInfo | null>(null);

const AuthProvider: React.FC<ProviderProps> = ({
  children,
  auth,
  onboardingStep,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const storeAvatar = useAppSelector(selectAvatar);

  useEffect(() => {
    console.log("auth ", auth?.user?.avatar)
    console.log("store ", storeAvatar)
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
    <AuthContext.Provider
      value={
        !user.uid
          ? auth
            ? auth.user
            : null
          : {
              firstName: user.firstName,
              lastName: user.lastName,
              uid: user.uid,
              avatar: storeAvatar.url ? storeAvatar : auth?.user?.avatar,
            }
      }
    >
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
