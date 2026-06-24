import React, { MouseEventHandler } from "react";

import { Avatar, PositionedAvatar } from "@/entities/avatar";
import { UIIconMenuButton } from "@/shared/ui";

// Button component used for an action in src\widgets\header\ui\UserActions\AccountMenuBtn.tsx.
const AccountMenuBtn: React.FC<TProps> = ({ handleClick, isOpen, avatar }) => {
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
