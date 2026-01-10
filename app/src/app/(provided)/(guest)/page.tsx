import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import style from "./guestPages.module.scss";

const HomePage: React.FC = async () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box component="section" sx={{ width: "64%", position: "relative" }}>
        <Image
          src="/imgs/large-hero.png"
          alt="hero"

          sizes="64vw"
          fill
          style={{ 
            objectFit: "cover",
            objectPosition: "right top",
            opacity: 0.8,
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
