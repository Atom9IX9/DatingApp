"use client";

import { TChildren, TTheme } from "@/types/types";
import ThemeProvider from "./ThemeProvider";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import { UserAuthInfo } from "@/models/user.model";
import { useSelector } from "react-redux";
import { selectAuth } from "@/selectors/accountSelector";

const Providers: React.FC<Props> = ({ children, cookies }) => {
  return (
    <StoreProvider>
      <AuthProvider cookiesAuth={cookies.auth}>
        <ThemeProvider cookiesTheme={cookies.theme}>{children}</ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default Providers;
export type Props = {
  children: TChildren;
  cookies: {
    theme: TTheme | undefined;
    auth: UserAuthInfo | undefined;
  };
};
