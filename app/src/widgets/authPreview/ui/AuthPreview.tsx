"use client";

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import { PositionedAvatar } from "@/entities/avatar";

const AuthPreview = () => {
  const { data } = useSession();

  // Render the component's JSX structure.
  return (
    <Box>
      {data?.user.avatar && (
        <PositionedAvatar avatar={data?.user.avatar} size={260} />
      )}
    </Box>
  );
};

export default AuthPreview;
