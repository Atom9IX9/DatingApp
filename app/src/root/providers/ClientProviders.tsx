"use client";

import { VerifyAuthResponse } from "@/features/auth";
import { ClientOnboardingStep, OnboardingStep, onboardingStepFromCookies } from "@/processes/register";
import { TChildren, TTheme } from "@/shared/types";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import OnboardingProxy from "../proxy/OnboardingProxy"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ThemeProvider from "./ThemeProvider";

const ClientProviders: React.FC<Props> = ({ auth, cookies, children }) => {
  return (
    <div>
      <StoreProvider>
        <AuthProvider auth={auth?.data || null}>
          <OnboardingProxy
            onboardingStep={
              auth?.data?.onboardingStep ||
              onboardingStepFromCookies(cookies.onboardingStep) ||
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
    </div>
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
