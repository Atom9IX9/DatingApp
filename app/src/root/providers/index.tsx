
"use client";
import { User } from "@/entities/user";
import StoreProvider from "./StoreProvider";
import {
  AuthProvider,
  ClientOnboardingStep,
  OnboardingStep,
  VerifyAuthResponse,
} from "@/features/auth";
import { ThemeProvider } from "@/shared/providers";
import { TChildren, TTheme } from "@/shared/types";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CheckAuthResponseData } from "@/features/auth";

export const Providers: React.FC<Props> = ({ children, cookies, auth }) => {
  let onboardingStep: OnboardingStep | undefined = auth?.data?.onboardingStep;

  if (auth?.error?.statusCode === 401) {
    onboardingStep = ClientOnboardingStep.CREDENTIALS;
  } else if (auth?.error?.statusCode === 403) {
    onboardingStep = ClientOnboardingStep.INFO;
  }

// Render the component's JSX structure.
  return (
    <StoreProvider>
      <AuthProvider auth={auth?.data} onboardingStep={onboardingStep}>
        <AppRouterCacheProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider cookiesTheme={cookies.theme}>
                {children}
              </ThemeProvider>
            </LocalizationProvider>
        </AppRouterCacheProvider>
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
  auth: VerifyAuthResponse | undefined;
};
