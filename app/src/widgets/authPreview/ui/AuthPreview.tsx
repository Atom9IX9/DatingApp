"use client";

import { PositionedAvatar, selectAvatar } from "@/entities/avatar";
import { useAppSelector } from "@/shared/lib";
import { Box } from "@mui/material";

const AuthPreview = () => {
  const avatar = useAppSelector(selectAvatar);
  return (
    <Box>
      <PositionedAvatar avatar={avatar} size={100} />
    </Box>
  );
};

export default AuthPreview;
