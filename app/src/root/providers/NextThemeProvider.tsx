import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const NextThemeProvider = ({ children }: Props) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};

export default NextThemeProvider;
