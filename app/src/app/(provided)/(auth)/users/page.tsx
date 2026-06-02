"use client";
import { selectAvatar } from "@/entities/avatar";
import { Sex } from "@/entities/user";
import { useAuth } from "@/features/auth";
import { UserMatchCard } from "@/widgets/userMatchCard";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const UsersPage = () => {
  const auth = useAuth();
  const avatar = useSelector(selectAvatar);

  return (
    <Box style={{ display: "flex", gap: 30 }}>
      {auth && (
        <UserMatchCard
          user={{
            uid: auth.uid || "1",
            firstName: auth.firstName,
            lastName: auth.lastName,
            age: 15,
            gender: Sex.Male,
            isOnline: true,
            description:
              "This is description for this user. It must be less, than 100 characters. Styled for cool rtk queryt. ",
            location: { region: "[obl]", country: "[country]" },
            avatar,
          }}
        />
      )}
    </Box>
  );
};

export default UsersPage;
