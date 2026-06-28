"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Cookies from "js-cookie";

import { VerifyAuthResponse } from "@/features/auth";
import {
  onboardingStepFromCookies,
  ClientOnboardingStep,
} from "@/processes/register";
import { TChildren, TTheme } from "@/shared/types";

import OnboardingProxy from "../proxy/OnboardingProxy";

import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

export const Providers: React.FC<Props> = ({ children, cookies, auth }) => {
  const onboardingStep = Cookies.get("onboardingStep");

  // Render the component's JSX structure.
  return (
    <StoreProvider>
      <AuthProvider auth={auth?.data}>
        <OnboardingProxy
          onboardingStep={
            auth?.data?.onboardingStep ||
            onboardingStepFromCookies(onboardingStep) ||
            ClientOnboardingStep.CREDENTIALS
          }
        >
          <AppRouterCacheProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider cookiesTheme={cookies.theme}>
                {children}
              </ThemeProvider>
            </LocalizationProvider>
          </AppRouterCacheProvider>
        </OnboardingProxy>
      </AuthProvider>
    </StoreProvider>
  );
};

// Exported type alias used for typing shared data shapes.
export type Props = {
  children: TChildren;
  cookies: {
    theme: TTheme | undefined;
  };
  auth: VerifyAuthResponse | null;
};
