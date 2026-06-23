"use client";

import { Box } from "@mui/material";

import { PositionedAvatar, selectAvatar } from "@/entities/avatar";
import { useAppSelector } from "@/root/model";

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
