import { Box } from "@mui/material";
import Image from "next/image";
import style from "./guestPages.module.scss";
import { AuthLinks } from "@/widgets/authLinks";
import heroImg from "../../../../public/assets/imgs/hero-hq.jpg";
import heroDecoration from "../../../../public/assets/imgs/hero-decoration.png";
// todo: animation for text
const Startpage: React.FC = async () => {
  return (
    <Box className={style.startpage}>
      <Box className={style.heroBlock}>
        <Image
          src={heroDecoration}
          alt="hero"
          sizes="64vw"
          priority
          fill
          style={{
            objectFit: "contain",
            objectPosition: "100% 50%",
            zIndex: 1,
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
          placeholder="empty"
          style={{
            objectFit: "cover",
            objectPosition: "center 45%",
            transform: "scaleX(-1)",
            height: "100%",
          }}
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
