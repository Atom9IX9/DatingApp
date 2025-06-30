"use client";

import { selectAuth, selectFetchAuthStatus } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { UserAuthInfo } from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuth } from "@/lib/store/slices/authSlice/authSlice";
import { redirect, useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { StatusCodes } from "@/types/statusCodes";

const AuthContext = createContext<UserAuthInfo | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children, auth }) => {
  const dispatch = useAppDispatch();
  const fetchAuthStatus = useSelector(selectFetchAuthStatus);

  useEffect(() => {
    if (auth) {
      dispatch(setAuth({ auth: { user: auth } }));
    }
  }, [dispatch, auth]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
type ProviderProps = { children: TChildren; auth: UserAuthInfo | undefined };
