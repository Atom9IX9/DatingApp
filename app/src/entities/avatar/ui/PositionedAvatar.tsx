"use client";
import { Box } from "@mui/material";
import Image from "next/image";

import { getStaticByUrl } from "@/shared/lib";

import { Avatar as TAvatar } from "../types";
import { useAvatarEdit } from "../lib/hooks/useAvatarEdit";

// Component that renders a positioned avatar image with transform and clipping behavior.
const PosAvatar: React.FC<Props> = ({ avatar, size }) => {
  const {
    refs,
    state,
    handlers: { handleImageLoad },
  } = useAvatarEdit();

  // Scale factor used to adjust avatar image position and size based on the rendered component dimensions.
  const k = size / 260;

  // Render the component's JSX structure.
  return (
    <Box
      ref={refs.containerRef}
      sx={{
        width: size,
        height: size,
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
      }}
    >
      {avatar.url && (
        <Image
          priority
          ref={refs.imgRef}
          onLoad={(e) => {
            // todo: Skeleton
            handleImageLoad(e);
          }}
          src={getStaticByUrl(avatar.url)}
          alt="avatar"
          width={size * 5}
          height={size * 5}
          draggable={false}
          style={{
            width: state.isLandscape ? "auto" : "100%",
            height: state.isLandscape ? "100%" : "auto",
            transformOrigin: "left top",
            transform: `translate(${avatar.posX * k}px, ${avatar.posY * k}px) scale(${avatar.scale})`,
          }}
        />
      )}
    </Box>
  );
};

// React component that renders an avatar crop area using transform and clipping.
export default PosAvatar;
// Type describing component props.
type Props = { avatar: TAvatar } & { size: number };
