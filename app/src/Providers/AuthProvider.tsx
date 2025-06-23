"use client";

import { selectAuth, selectFetchAuthStatus } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { UserAuthInfo } from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { initialize } from "@/lib/store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";

const AuthContext = createContext<UserAuthInfo | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
type ProviderProps = { children: TChildren };
