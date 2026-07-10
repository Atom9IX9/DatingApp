import { Box } from "@mui/material";
import Image from "next/image";

import heroImg from "../../public/assets/imgs/hero.png";

import style from "./guestPages.module.scss";

const HeroBlock: React.FC<Props> = ({ forPageGroup }) => {
  // Render the component's JSX structure.
  return (
    <Box className={style.heroBlock}>
      <Image
        src={heroImg}
        alt="hero"
        sizes="64vw"
        fill
        priority
        className={`${style.heroImg} ${style.forPageGroup}`}
        style={{
          objectFit: "cover",
          objectPosition: "right",
          height: "100%",
          transition: "all 1s",
        }}
      />
    </Box>
  );
};

export default HeroBlock;
// Type describing component props.
type Props = {
  forPageGroup: "startpage" | "auth";
};
