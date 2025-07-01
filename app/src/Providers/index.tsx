"use client";

import { TChildren } from "@/types/types";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import { UserAuthInfo } from "@/models/user.model";
import { useSelector } from "react-redux";
import { selectAuth } from "@/selectors/accountSelector";

const Providers: React.FC<Props> = ({ children, cookiesAuth }) => {

  return (
    <StoreProvider>
      <AuthProvider cookiesAuth={cookiesAuth}>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
export type Props = { children: TChildren; cookiesAuth: UserAuthInfo | undefined };
