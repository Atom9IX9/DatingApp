"use client";

import { Box } from "@mui/material";
import { FC, useState } from "react";
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';

const AvatarEditForm: FC<Props> = ({ avatarUrl }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [imgSize, setImgSize] = useState({
    width: 0,
    height: 0,
  });

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    setIsLandscape(target.naturalWidth >= target.naturalHeight);

    setImgSize({
      width: target.naturalWidth,
      height: target.naturalHeight,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          width: 260,
          height: 260,
          display: "flex",
          border: "2px solid #ffffff67",
          position: "relative",
          cursor: "grab",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={avatarUrl}
          alt="avatar"
          onLoad={handleLoad}
          sx={{
            position: "absolute",
            width: isLandscape ? "auto" : 260,
            height: isLandscape ? 260 : "auto",
            objectPosition: "center",
            userSelect: "none",
            pointerEvents: "none",
            //transform: `translate(${20}px, ${20}px)`,
          }}
        />

        <Box
          sx={{
            border: "80px solid #0000008e",
            boxSizing: "border-box",
            width: 374,
            height: 374,
            borderRadius: "100%",
            position: "absolute",
            left: "-57px",
            top: "-57px",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            color: "#999999",
            bottom: 4,
            left: 68,
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <Box>drag to move</Box>
          <OpenWithOutlinedIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarEditForm;
type Props = {
  avatarUrl: string;
};
