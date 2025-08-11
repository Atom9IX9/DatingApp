"use client";
import { selectUser, User } from "@/entities";
import { createContext, useEffect } from "react";
import { TChildren, useAppSelector } from "@/shared";
import { useAppDispatch } from "@/shared";
import { setUser } from "@/entities";

export const AuthContext = createContext<User | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children, cookiesUser }) => {
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectUser);

  useEffect(() => {
    if (cookiesUser) {
      dispatch(setUser(cookiesUser));
    }
  }, [dispatch, cookiesUser]);

  return (
    <AuthContext.Provider value={cookiesUser ? cookiesUser : storeUser}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
type ProviderProps = {
  children: TChildren;
  cookiesUser: User | undefined;
};
