import { useTheme } from "@/Providers/ThemeProvider";
import { Colors } from "@/types/types";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler } from "react";
import { stringToColor } from "../../../utils/stringToColor";
import UIIconMenuButton from "@/components/UI/Menu/UIIconMenuButton";

const AccountMenuBtn: React.FC<TProps> = ({
  handleClick,
  isOpen,
  firstName,
  lastName,
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
            : Colors.SecondaryDark,
      },
      children: name ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : "",
    };
  }

  return (
    <UIIconMenuButton handleClick={handleClick} isOpen={isOpen}>
      <Avatar
        {...stringAvatar(
          firstName && lastName ? `${firstName} ${lastName}` : ""
        )}
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
};
