import { Box } from "@mui/material";
import Image from "next/image";
import style from "./guestPages.module.scss";
import { AuthLinks } from "@/widgets";

const Startpage: React.FC = async () => {
  return (
    <Box className={style.startpage}>
      <Box className={style.heroBlock}>
        <Image
          src="/imgs/hero-hq.jpg"
          alt="hero"
          sizes="64vw"
          fill
          priority
          className={style.heroImg}
          style={{
            objectFit: "cover",
            objectPosition: "center 45%",
            transform: "scaleX(-1)",
            height: "100%",
          }}
        />
        <Image
          src="/imgs/hero-decoration.png"
          alt="hero"
          sizes="64vw"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "100% 50%",    
          }}
          draggable={false}
        />
      </Box>
      <Box className={style.textSectionContainer}>
        <Box component="section" className={style.textSection}>
          <Box
            component={"h1"}
            color={"secondary.main"}
            className={style.heading}
          >
            WELCOME TO <br /> DatingApp!
          </Box>
          <Box component="p" className={style.subheading}>
            Find new friends, meaningful connections, or someone special — all
            in one place. Join thousands of people meeting every day!
          </Box>
          <Box className={style.ctaButtons}>
            <AuthLinks />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Startpage;
