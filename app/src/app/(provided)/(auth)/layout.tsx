
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

// Root layout component that wraps every page and reads server cookies/headers.
const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
// Render the component's JSX structure.
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

// Root layout component that wraps every page and reads server cookies/headers.
export default RootLayout;
