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
import {
  CheckAuthResponseData,
} from "../verifyAuth/api/verifyAuthAPI";
import { setAvatar } from "@/entities/avatar";

export const AuthContext = createContext<UserAccountInfo | null>(null);

const AuthProvider: React.FC<ProviderProps> = ({ children, auth }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(setUserAuth(auth.authCredentials));
      dispatch(setUserAccountInfo(auth.user));
      if (auth.user.avatar) {
        dispatch(setAvatar(auth.user.avatar));
      }
    }
  }, [dispatch, auth]);

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
};
