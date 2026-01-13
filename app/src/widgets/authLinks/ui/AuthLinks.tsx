import { Box } from "@mui/material";
import style from "./auhtLinks.module.scss";
import { GradientButton } from "@/shared";
import Link from "next/link";

const AuthLinks = () => {
  return (
    <Box className={style.container}>
      <Link href="/sign-up">
        <GradientButton textTransform="uppercase">sign up</GradientButton>
      </Link>
      
      <Link href="/sign-in">
        <GradientButton textTransform="uppercase" color="secondary">
          sign in
        </GradientButton>
      </Link>
    </Box>
  );
};

export default AuthLinks;
