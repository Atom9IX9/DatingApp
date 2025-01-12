import style from "./guestPages.module.scss";

const GuestLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={style.layout}>{children}</div>;
};

export default GuestLayout;
