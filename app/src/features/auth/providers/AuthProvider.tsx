"use client";
import {
  selectUser,
  User,
  setUserAuth,
  setUserAccountInfo,
  UserAccountInfo,
} from "@/entities/user";
import { useEffect } from "react";
import { createContext } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import {
  CheckAuthResponseData,
  VerifyAuthResponse,
} from "../verifyAuth/api/verifyAuthAPI";
import { setAvatar } from "@/entities/avatar";

export const AuthContext = createContext<UserAccountInfo | null>(null);

const AuthProvider: React.FC<ProviderProps> = ({ children, auth }) => {
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectUser);

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
    <AuthContext.Provider value={auth ? auth.user : storeUser}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  auth: CheckAuthResponseData | undefined;
};
