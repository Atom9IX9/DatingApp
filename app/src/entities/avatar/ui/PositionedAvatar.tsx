"use client";
import { Box } from "@mui/material";
import { transformAvatarStyle } from "../lib/transfromAvatarStyle";
import { Avatar as TAvatar } from "../types";
import { getStaticByUrl } from "@/shared/lib";
import Image from "next/image";
import { useAvatarEdit } from "@/features/avatarCustomization/lib/hooks/useAvatarEdit";

const PosAvatar: React.FC<Props> = ({ avatar, size }) => {
  const {
    refs,
    state,
    handlers: { handleImageLoad },
  } = useAvatarEdit({
    posX: avatar.posX,
    posY: avatar.posY,
    scale: avatar.scale,
  });

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
      <Image
        ref={refs.imgRef}
        onLoad={handleImageLoad}
        src={getStaticByUrl(avatar.url)}
        alt="avatar"
        fill
        blurDataURL={getStaticByUrl(avatar.url)}
        placeholder="blur"
        quality={100}
        style={{ transformOrigin: "left top", objectFit: "cover" }} 
      />
    </Box>
  );
};

export default PosAvatar;
type Props = { avatar: TAvatar } & { size: number };
