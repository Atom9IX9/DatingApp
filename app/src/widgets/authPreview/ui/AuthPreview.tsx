
"use client";

import { PositionedAvatar, selectAvatar } from "@/entities/avatar";
import { useAppSelector } from "@/shared/lib";
import { Box } from "@mui/material";

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
