"use client";

import { TChildren } from "@/shared/types";
import { CheckAuthResponseData } from "@/features/auth";
import { AuthContext } from "@/features/auth/client";

// Provider component that supplies context or store values for Auth.
const AuthProvider: React.FC<ProviderProps> = ({ children, auth }) => {
  // Render the component's JSX structure.
  return (
    <AuthContext.Provider value={auth?.user || null}>
      {children}
    </AuthContext.Provider>
  );
};

// Provider that supplies Auth context or state.
export default AuthProvider;
// Props type for the Provider component.
type ProviderProps = {
  children: TChildren;
  auth: CheckAuthResponseData | null;
};
