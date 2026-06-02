export { useLogin } from "./signIn/hooks/useLogin";

// ui forms
export { default as SignInForm } from "./signIn/ui/SignInForm/SignInFormController";
export { default as CredentialsForm } from "./signUp/ui/credentialsForm/CredentialsFormController.tsx";
export { default as RegisterUserPersonalInfoForm } from "./signUp/ui/registerPersonalInfoForm/registerPersonalInfoFormController.tsx";
export { default as DescriptionForm } from "./signUp/ui/descriptionForm/DescriptionFormController.tsx";

export type { DataForLogin } from "./signIn/api/signInAPI";
export { verifyAuth } from "./verifyAuth/api/verifyAuthAPI";
export type {
  VerifyAuthResponse,
  CheckAuthResponseData,
  OnboardingStep,
} from "./verifyAuth/api/verifyAuthAPI";
export {
  ResponseOnboardingStep,
  ClientOnboardingStep,
} from "./verifyAuth/api/verifyAuthAPI";
export { useAuth } from "./hooks/useAuth";
export { default as AuthProvider } from "./providers/AuthProvider";
export { validateEmail } from "./lib/validation/validateEmail";
