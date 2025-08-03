import { useTheme } from "@/shared";
import { Colors } from "@/types/colors";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler } from "react";
import { stringToColor } from "../../../utils/stringToColor";
import UIIconMenuButton from "@/shared/ui/UIIconMenuButton";

const AccountMenuBtn: React.FC<TProps> = ({
  handleClick,
  isOpen,
  firstName,
  lastName,
  avatar,
}) => {
  const theme = useTheme();

  function stringAvatar(name?: string) {
    return {
      sx: {
        bgcolor:
          theme === "light"
            ? Colors.PrimaryLight
            : name
            ? stringToColor(name)
            : Colors.Secondary,
        border: avatar ? "2px solid #00000050" : "none",
      },
      children: name ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : "",
    };
  }

  return (
    <UIIconMenuButton
      title="Account menu"
      handleClick={handleClick}
      isOpen={isOpen}
    >
      <Avatar
        {...stringAvatar(
          firstName && lastName ? `${firstName} ${lastName}` : ""
        )}
        src={avatar || undefined}
      />
    </UIIconMenuButton>
  );
};

export default AccountMenuBtn;
type TProps = {
  handleClick: MouseEventHandler;
  isOpen: boolean;
  firstName?: string;
  lastName?: string;
  avatar: string | null;
};
