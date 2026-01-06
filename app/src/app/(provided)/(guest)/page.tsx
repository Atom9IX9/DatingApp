import { Box } from "@mui/material";
import Link from "next/link";

const HomePage: React.FC = async () => {
  return (
    <Box>
      start unauth page 
      <div>
        <Link href="sign-in">Sign in</Link>
      </div>
      <div>
        <Link href="sign-up">Sign up</Link>
      </div>
    </Box>
  );
};

export default HomePage;

