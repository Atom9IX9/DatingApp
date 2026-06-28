import { Box } from "@mui/material";

import { RegisterProcess } from "@/processes/register";

import style from "../../../guestPages.module.scss";
import HeroBlock from "../../../HeroBlock";

// Server-rendered page component for the start page.
const Startpage: React.FC = async () => {
  // Render the component's JSX structure.
  return (
    <Box className={`${style.mainBlock} ${style.signUpPage}`}>
      <HeroBlock forPage="signUpPage" />
      <RegisterProcess />
    </Box>
  );
};

// Server-rendered page component for the start page.
export default Startpage;
