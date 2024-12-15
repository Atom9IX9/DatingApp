"use client"; //todo: remove classes and do server
import UserCard from "@/components/Users/UserCard/UserCard";
import User, { Gender } from "@/models/user.model";

const UsersPage = () => {
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <UserCard
        user={{
          uid: "dfnjndfsaaad",
          firstName: "Yaroslav",
          lastName: "Vorobyov",
          age: 15,
          dateOfBD: "01-01-2024",
          email: "sdfsa@gmail.com",
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
          firstName: "Oksana",
          lastName: "Vorobyova",
          age: 45,
          dateOfBD: "05-019-1980",
          email: "sdfsa@gmail.com",
          gender: Gender.Male,
          isOnline: true,
          description: undefined,
          location: { region: "Poltavska oblast", country: "Ukraine", city: "v. Orzhica" },
        }}
      />
    </div>
  );
};

export default UsersPage;
