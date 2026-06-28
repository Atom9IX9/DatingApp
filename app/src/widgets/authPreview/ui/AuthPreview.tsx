"use client";

import { Box } from "@mui/material";

import { PositionedAvatar } from "@/entities/avatar";
import { selectAvatar } from "@/entities/avatar/client";
import { useAppSelector } from "@/shared/lib";

const AuthPreview = () => {
  const avatar = useAppSelector(selectAvatar);
  // Render the component's JSX structure.
  return (
    <Box>
      <PositionedAvatar avatar={avatar} size={260} />
    </Box>
  );
};

export default AuthPreview;
