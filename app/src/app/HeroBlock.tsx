
"use client";

import { Box } from "@mui/material";
import Image from "next/image";

import heroImg from "../../public/assets/imgs/hero.png";

import style from "./guestPages.module.scss";

const HeroBlock: React.FC<Props> = ({ forPage }) => {
// Render the component's JSX structure.
  return (
    <Box className={style.heroBlock}>
      <Image
        src={heroImg}
        alt="hero"
        sizes="64vw"
        fill
        priority
        className={style.heroImg}
        placeholder="blur"
        style={{
          objectFit: "cover",
          objectPosition: "right",
          height: "100%",
          opacity: 0,
          transition: "all 1s",
        }}
        onLoad={(e) => {
          if (forPage === "startpage") {
            e.currentTarget.style.opacity = "0.75";
          } else {
            e.currentTarget.style.opacity = "1";
          }
        }}
      />
    </Box>
  );
};

export default HeroBlock;
// Type describing component props.
type Props = {
  forPage: "startpage" | "signUpPage" | "signInPage";
};
