import { Nunito, Quicksand } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-primary",
});

export const quicksend = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-secondary",
});