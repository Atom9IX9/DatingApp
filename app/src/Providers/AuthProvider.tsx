"use client";

import { selectAuth, selectFetchAuthStatus } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { UserAuthInfo } from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { checkAuth } from "@/lib/store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { StatusCodes } from "@/types/statusCodes";

const AuthContext = createContext<UserAuthInfo | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuth);
  const fetchAuthStatus = useSelector(selectFetchAuthStatus);
  const router = useRouter()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (fetchAuthStatus === StatusCodes.Unauth) {
      router.push("/")
    }
  }, [fetchAuthStatus])

  return (
    // todo: refactor with next-auth lib
    <AuthContext.Provider value={auth}>
      {fetchAuthStatus === QueryStatus.pending ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
type ProviderProps = { children: TChildren };
