"use client";
import {
  selectUser,
  User,
  setUserAuth,
  setUserAccountInfo,
} from "@/entities/user";
import { useEffect } from "react";
import { createContext } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { TChildren } from "@/shared/types";
import { CheckAuthResponseData, VerifyAuthResponse } from "../verifyAuth/api/verifyAuthAPI";

export const AuthContext = createContext<User | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children, auth }) => {
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectUser);

  useEffect(() => {
    if (auth) {
      dispatch(setUserAuth(auth.authCredentials));
      dispatch(
        setUserAccountInfo(auth.user),
      );
    }
  }, [dispatch, auth]);

  return (
    <AuthContext.Provider value={auth ? auth : storeUser}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  auth: CheckAuthResponseData | undefined;
};
