"use client";

import { selectAuth, selectFetchAuthStatus } from "@/selectors/accountSelector";
import { TChildren } from "@/types/types";
import { AuthUser } from "@/models/user.model";
import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { initialize } from "@/lib/store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";
import { QueryStatus } from "@reduxjs/toolkit/query";

const AuthContext = createContext<AuthUser | undefined>(undefined);

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuth);
  const fetchAuthStatus = useSelector(selectFetchAuthStatus);
  const router = useRouter();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  useEffect(() => {
    if (fetchAuthStatus === QueryStatus.fulfilled) {
      router.push("/users");
    } else if (fetchAuthStatus === QueryStatus.rejected) {
      if (!auth) {
        router.push("/");
      }
    }
  }, [router, fetchAuthStatus, auth]);

  return (
    <>
      {fetchAuthStatus === QueryStatus.pending ? (
        <>Loading...</>
      ) : (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
type ProviderProps = { children: TChildren };
