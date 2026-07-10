"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { VerifyAuthResponse } from "@/features/auth";
import {
  ClientOnboardingStep,
  onboardingStepFromCookies,
} from "@/processes/register";
import { TChildren, TTheme } from "@/shared/types";

import OnboardingProxy from "../proxy/OnboardingProxy";

import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

const ClientProviders: React.FC<Props> = ({ auth, cookies, children }) => {
  return (
    <AppRouterCacheProvider>
      <StoreProvider>
        <AuthProvider auth={auth?.data || null}>
          <OnboardingProxy
            onboardingStep={
              auth?.data?.onboardingStep ||
              onboardingStepFromCookies(cookies.onboardingStep) ||
              ClientOnboardingStep.CREDENTIALS
            }
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider cookiesTheme={cookies.theme}>
                {children}
              </ThemeProvider>
            </LocalizationProvider>
          </OnboardingProxy>
        </AuthProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
};

export default ClientProviders;
export type Props = {
  children: TChildren;
  cookies: {
    theme: TTheme | undefined;
    onboardingStep: string | undefined;
  };
  auth: VerifyAuthResponse | null;
};
