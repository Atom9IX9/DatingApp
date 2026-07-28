"use client";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import { Sex } from "@/entities/user";
import { UserMatchCard } from "@/widgets/userMatchCard";

// Page-level component representing the Users view.
const UsersPage = () => {
  const { data } = useSession();

  // Render the component's JSX structure.
  return (
    <Box style={{ display: "flex", gap: 30 }}>
      {data?.user && (
        <UserMatchCard
          user={{
            uid: data?.user.id || "1",
            firstName: data?.user.accountInfo?.firstName || "default fn",
            lastName: data?.user.accountInfo?.lastName || "default ln",
            age: 15,
            gender: Sex.Male,
            isOnline: true,
            description:
              "This is description for this user. It must be less, than 100 characters. Styled for cool rtk queryt. ",
            location: { region: "[obl]", country: "[country]" },
            avatar: data?.user.accountInfo?.avatar || {
              posX: 0,
              posY: 0,
              scale: 1,
              url: "",
            },
          }}
        />
      )}
    </Box>
  );
};

// Page component for the Users view.
export default UsersPage;
