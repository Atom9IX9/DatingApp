"use client";
import { selectAuth } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { UserAuthInfo } from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
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
