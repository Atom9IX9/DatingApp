import { Suspense } from "react";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { AuthProviders } from "@/root";
import { verifyAuth } from "@/features/auth/server";
import { VerifyAuthResponse } from "@/features/auth";

// Root layout component that wraps every page and reads server cookies/headers.
const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  let auth: null | VerifyAuthResponse = null;

  try {
    auth = await verifyAuth();
  } catch (error) {
    console.log("Error verifying auth:", error);
  }

  // Render the component's JSX structure.
  return (
    <>
      <Header />
      <main className="main">
        <AuthProviders auth={auth}>
          <Suspense fallback="...loading">{children}</Suspense>
        </AuthProviders>
      </main>
      <Footer />
    </>
  );
};

// Root layout component that wraps every page and reads server cookies/headers.
export default AuthLayout;
