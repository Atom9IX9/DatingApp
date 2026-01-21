import { UserGender } from "@/entities/user";
import { UserMatchCard } from "@/widgets/userMatchCard";
import { Box } from "@mui/material";

const UsersPage = () => {
  return (
    <Box style={{ display: "flex", gap: 30 }}>
      <UserMatchCard
        user={{
          uid: "dfnjndfsaaad",
          firstName: "Yaroslav",
          lastName: "Vorobyov",
          age: 15,
          gender: UserGender.Male,
          isOnline: true,
          description:
            "This is description for this user. It must be less, than 100 characters. Styled for cool rtk queryt. ",
          location: { region: "Poltavska oblast", country: "Ukraine" },
        }}
      />
      <UserMatchCard
        isEven
        user={{
          uid: "dfnddsfjndfsaaad",
          firstName: "Polina",
          lastName: "Shapranova",
          age: 45,
          gender: UserGender.Female,
          isOnline: true,
          description: undefined,
          location: {
            region: "Poltavska oblast",
            country: "Ukraine",
            city: "v. Anyone",
          },
        }}
      />
    </Box>
  );
};

export default UsersPage;
