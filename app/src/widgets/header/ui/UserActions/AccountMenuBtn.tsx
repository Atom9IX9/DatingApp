
import { Avatar, PositionedAvatar } from "@/entities/avatar";
import { stringToColor, useTheme } from "@/shared/lib";
import { Colors } from "@/shared/types";
import { UIIconMenuButton } from "@/shared/ui";
import { MouseEventHandler } from "react";

// Button component used for an action in src\widgets\header\ui\UserActions\AccountMenuBtn.tsx.
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

// Render the component's JSX structure.
  return (
    <UIIconMenuButton
      title="Account menu"
      handleClick={handleClick}
      isOpen={isOpen}
    >
      {avatar?.url && <PositionedAvatar avatar={avatar} size={40} />}
    </UIIconMenuButton>
  );
};

// Button component for a user action in src\widgets\header\ui\UserActions\AccountMenuBtn.tsx.
export default AccountMenuBtn;
// Props type for the T component.
type TProps = {
  handleClick: MouseEventHandler;
  isOpen: boolean;
  firstName?: string;
  lastName?: string;
  avatar: Avatar | null;
};
