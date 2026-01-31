import { Box } from "@mui/material";
import style from "../guestPages.module.scss";
import HeroBlock from "../HeroBlock";
import { RegisterProcess } from "@/processes/register";

const Startpage: React.FC = async () => {
  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPage="signUpPage" />
      <RegisterProcess />
    </Box>
  );
};

export default Startpage;
