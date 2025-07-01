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

const AuthProvider: React.FC<ProviderProps> = ({ children, cookiesAuth }) => {
  const dispatch = useAppDispatch();
  const storeAuth = useSelector(selectAuth);

  useEffect(() => {
    if (cookiesAuth) {
      dispatch(setAuth({ auth: { user: cookiesAuth } }));
    }
  }, [dispatch, cookiesAuth]);

  return (
    <AuthContext.Provider value={cookiesAuth ? cookiesAuth : storeAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  cookiesAuth: UserAuthInfo | undefined;
};
