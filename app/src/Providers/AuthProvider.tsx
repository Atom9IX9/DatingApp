"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/slices/appSlice/authSlice";
import { selectAuth } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { User } from "@/types/User";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext<User | null>(null);

const AuthProvider: React.FC<{ children: TChildren }> = ({ children }) => {
  const auth = useSelector(selectAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUser({
        id: "myuserid",
        age: 23,
        firstName: "Ultroler",
        gender: "male",
        lastName: "Ahahasik",
      })
    );
  }, [dispatch]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
