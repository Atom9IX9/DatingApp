import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { auth } from "@/auth";

// Root layout component that wraps every page and reads server cookies/headers.
const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  // Render the component's JSX structure.
  return (
    <SessionProvider session={session}>
      <Header />
      <main className="main">
        <Suspense fallback="...loading">{children}</Suspense>
      </main>
      <Footer />
    </SessionProvider>
  );
};

// Root layout component that wraps every page and reads server cookies/headers.
export default AuthLayout;
