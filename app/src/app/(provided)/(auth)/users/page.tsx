import { UserCard } from "@/entities";
import { UserGender } from "@/entities";
import { MatchBtn } from "@/features";

const UsersPage = () => {
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <UserCard
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
        bottomSection={<MatchBtn />}
      />
      <UserCard
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
        bottomSection={<MatchBtn />}
      />
    </div>
  );
};

export default UsersPage;
