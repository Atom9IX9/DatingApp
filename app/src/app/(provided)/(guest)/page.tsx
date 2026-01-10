import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import style from "./guestPages.module.scss";

const HomePage: React.FC = async () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box component="section" sx={{ width: "55%", position: "relative" }}>
        <Image
          src="/imgs/hero.png"
          alt="hero"
          sizes="40vw"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
