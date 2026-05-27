"use client"
import { Avatar } from "@mui/material";
import { transformAvatarStyle } from "../lib/transfromAvatarStyle";
import { Avatar as TAvatar } from "../types";
import { getStaticByUrl } from "@/shared/lib";

const PosAvatar: React.FC<Props> = ({ avatar, size }) => {
  return (
    <Avatar
      src={getStaticByUrl(avatar.url)}
      alt="avatar"
      sx={{
        width: size,
        height: size,
        "&	.MuiAvatar-img": {
          transform: transformAvatarStyle(
            avatar.scale,
            avatar.posX,
            avatar.posY,
            size,
          ),
        },
      }}
    />
  );
};

export default PosAvatar;
type Props = { avatar: TAvatar } & { size: number };
