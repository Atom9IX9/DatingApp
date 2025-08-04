"use client";
import { selectAuth } from "@/selectors/accountSelector";
import { UserAuthInfo } from "@/entities/user/model/user";
import { createContext, useEffect } from "react";
import { TChildren, useAppSelector } from "@/shared";
import { useAppDispatch } from "@/shared";
import { setAuth } from "@/lib/store/slices/authSlice/authSlice";

export const AuthContext = createContext<UserAuthInfo | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children, cookiesAuth }) => {
  const dispatch = useAppDispatch();
  const storeAuth = useAppSelector(selectAuth);

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

export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  cookiesAuth: UserAuthInfo | undefined;
};
