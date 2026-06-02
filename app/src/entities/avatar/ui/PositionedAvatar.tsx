"use client";
import { Box } from "@mui/material";
import { Avatar as TAvatar } from "../types";
import { getStaticByUrl } from "@/shared/lib";
import Image from "next/image";
import { useAvatarEdit } from "@/features/avatarCustomization/lib/hooks/useAvatarEdit";

const PosAvatar: React.FC<Props> = ({ avatar, size }) => {
  const {
    refs,
    state,
    handlers: { handleImageLoad },
  } = useAvatarEdit();

  const k = size / 260;

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
          ref={refs.imgRef}
          onLoad={handleImageLoad}
          src={getStaticByUrl(avatar.url)}
          alt="avatar"
          blurDataURL={getStaticByUrl(avatar.url)}
          placeholder="blur"
          width={size*5}
          height={size*5}
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

export default PosAvatar;
type Props = { avatar: TAvatar } & { size: number };
