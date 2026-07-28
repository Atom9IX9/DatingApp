import { auth } from "@/auth";
import { RootProviders } from "@/root";

const ProvidedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  // Render the component's JSX structure.
  return <RootProviders session={session}>{children}</RootProviders>;
};

// Root layout component that wraps every page and reads server cookies/headers.
export default ProvidedLayout;
