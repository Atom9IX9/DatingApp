import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
