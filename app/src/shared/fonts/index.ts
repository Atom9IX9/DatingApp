import { Nunito, Quicksand } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: '--nunito-font'
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: '--quicksand_font',
})