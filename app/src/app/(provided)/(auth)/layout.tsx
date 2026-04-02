import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/features/auth";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get("tokaccessTokenen")?.value as string;

  const res = await verifyAuth(token);
  if (!res.data) {
    switch (res.error?.statusCode) {
      case 401: {
        redirect("/sign-up");
      }
      case 403: {
        redirect("/sign-up");
      }
    }
  }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
