import { Box } from "@mui/material";
import style from "../guestPages.module.scss";
import { AuthLinks } from "@/widgets/authLinks";
import HeroBlock from "../HeroBlock";

const Startpage: React.FC = async () => {
  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPage="signUpPage" />
      
    </Box>
  );
};

export default Startpage;
