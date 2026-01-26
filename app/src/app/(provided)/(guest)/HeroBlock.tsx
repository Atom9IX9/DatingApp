"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import heroImg from "../../../../public/assets/imgs/hero-hq.jpg";
import heroDecoration from "../../../../public/assets/imgs/hero-decoration.png";
import signInHeroDecoration from "../../../../public/assets/imgs/hero-decoration.png";
import signUpHeroDecoration from "../../../../public/assets/imgs/hero-decoration-sign-up.png";
import style from "./guestPages.module.scss";

const HeroBlock: React.FC<Props> = ({ forPage }) => {
  return (
    <Box className={style.heroBlock}>
      <Image
        src={
          forPage === "startpage"
            ? heroDecoration
            : forPage === "signInPage"
              ? signInHeroDecoration
              : forPage === "signUpPage"
                ? signUpHeroDecoration
                : ""
        }
        alt="hero"
        sizes="64vw"
        priority
        fill
        style={{
          objectFit: "contain",
          objectPosition: "100% 50%",
          zIndex: 1,
          left: "1px"
        }}
        loading="eager"
        draggable={false}
      />

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
          objectPosition: "center 45%",
          transform: "scaleX(-1)",
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
type Props = {
  forPage: "startpage" | "signUpPage" | "signInPage";
};
