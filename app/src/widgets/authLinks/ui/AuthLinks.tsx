import { Box } from "@mui/material";
import { GradientButton } from "@/shared/ui";
import Link from "next/link";
import React from "react";

const AuthLinks: React.FC<Props> = ({ spaceBetween }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "47px",
        justifyContent: spaceBetween ? "space-between" : "unset",
      }}
    >
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
type Props = {
  spaceBetween?: boolean;
};
