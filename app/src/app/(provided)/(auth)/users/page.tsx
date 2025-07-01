import UserCard from "@/components/Users/UserCard/UserCard";
import { Gender } from "@/models/user.model";

const UsersPage = () => {
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <UserCard
        user={{
          uid: "dfnjndfsaaad",
          firstName: "Yaroslav",
          lastName: "Vorobyov",
          age: 15,
          gender: Gender.Male,
          isOnline: true,
          description:
            "This is description for this user. It must be less, than 100 characters. Styled for cool rtk queryt. fdd ddfdf  df dfdf.d d dd",
          location: { region: "Poltavska oblast", country: "Ukraine" },
        }}
      />
      <UserCard
        isEven
        user={{
          uid: "dfnddsfjndfsaaad",
          firstName: "Polina",
          lastName: "Shapranova",
          age: 45,
          gender: Gender.Female,
          isOnline: true,
          description: undefined,
          location: {
            region: "Poltavska oblast",
            country: "Ukraine",
            city: "v. Anyone",
          },
        }}
      />
    </div>
  );
};

export default UsersPage;
