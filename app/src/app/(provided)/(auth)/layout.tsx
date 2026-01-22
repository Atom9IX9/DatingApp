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
  const token = cookies().get("token")?.value;
  const authRes = await verifyAuth(token);

  if (authRes.statusCode === 401 || !authRes.user) {
    redirect("/");
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
