import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { checkAuth } from "@/api/authAPI";
import { redirect } from "next/navigation";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get("token")?.value;
  const authRes = await checkAuth(token);

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
