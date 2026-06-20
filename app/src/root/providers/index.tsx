"use client";
import StoreProvider from "./StoreProvider";
import {
  AuthProvider,
  ClientOnboardingStep,
  OnboardingStep,
  ResponseOnboardingStep,
  VerifyAuthResponse,
} from "@/features/auth";
import {
  onboardingStepFromCookies,
  OnboardingStepProvider,
} from "@/processes/register";
import { ThemeProvider } from "@/shared/providers";
import { TChildren, TTheme } from "@/shared/types";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Cookies from "js-cookie";

export const Providers: React.FC<Props> = ({ children, cookies, auth }) => {
  const onboardingStep = Cookies.get("onboardingStep");

  // Render the component's JSX structure.
  return (
    <StoreProvider>
      <AuthProvider auth={auth?.data}>
        <OnboardingStepProvider
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
        </OnboardingStepProvider>
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
