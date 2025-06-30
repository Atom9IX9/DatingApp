import { checkAuth } from "@/api/authAPI";
import style from "./guestPages.module.scss";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = cookies().get("token")?.value
  const authRes = await checkAuth(token) 

  if (authRes.user) {
    redirect("/users")
  }

  return <div className={style.layout}>{children}</div>;
};

export default GuestLayout;
