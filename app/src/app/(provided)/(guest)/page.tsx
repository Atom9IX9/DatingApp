import { Box } from "@mui/material";
import style from "./guestPages.module.scss";
import { AuthLinks } from "@/widgets/authLinks";
import HeroBlock from "./HeroBlock";

const Startpage: React.FC = async () => {
  return (
    <Box className={style.startpage}>
      <HeroBlock />
      <Box className={style.textSectionContainer}>
        <Box component="section" className={style.textSection}>
          <Box
            component={"h1"}
            color={"secondary.main"}
            className={style.heading}
            translate="no"
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
