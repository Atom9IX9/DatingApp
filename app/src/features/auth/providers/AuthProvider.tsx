
"use client";
import {
  setUserAuth,
  setUserAccountInfo,
  UserAccountInfo,
  selectUser,
} from "@/entities/user";
import { createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import { selectAvatar, setAvatar } from "@/entities/avatar";
import { CheckAuthResponseData, OnboardingStep } from "../types";
import { setCurrentStep } from "@/processes/register";

export const AuthContext = createContext<UserAccountInfo | null>(null);

// Provider component that supplies context or store values for Auth.
const AuthProvider: React.FC<ProviderProps> = ({
  children,
  auth,
}) => {
  const dispatch = useAppDispatch();
// Custom hook that handles r logic.
  const user = useAppSelector(selectUser);
  const storeAvatar = useAppSelector(selectAvatar);

  useEffect(() => {
    if (auth) {
      dispatch(setUserAuth(auth.authCredentials));
      if (auth.user) {
        dispatch(setUserAccountInfo(auth.user));
        if (auth.user.avatar) {
          dispatch(setAvatar(auth.user.avatar));
        }
      }
    }
  }, [dispatch, auth]);

// Render the component's JSX structure.
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

// Provider that supplies Auth context or state.
export default AuthProvider;
// Props type for the Provider component.
type ProviderProps = {
  children: TChildren;
  auth: CheckAuthResponseData | undefined;
};
