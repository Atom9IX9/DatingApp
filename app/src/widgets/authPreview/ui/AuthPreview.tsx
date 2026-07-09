"use client";

import { Box } from "@mui/material";

import { PositionedAvatar } from "@/entities/avatar";
import { useAuth } from "@/features/auth/client";

const AuthPreview = () => {
  const auth = useAuth();

  // Render the component's JSX structure.
  return (
    <Box>
      {auth?.avatar && <PositionedAvatar avatar={auth.avatar} size={260} />}
    </Box>
  );
};

export default AuthPreview;
