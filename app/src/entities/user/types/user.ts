export type User = UserInfo & UserAuth;

export type UserInfo = {
  age: number;
  gender: UserGender;
  location?: UserLocation;
  description?: string; // hobbies
};

export enum UserGender {
  Male = "male",
  Female = "female",
}
export type UserLocation = {
  country: string;
  region: string;
  city?: string;
};

export type UserAuth = {
  email: string;
  dateOfBD: string;
} & UserIdentifiers;

export type UserIdentifiers = {
  uid: string;
  firstName: string;
  lastName: string;
};

export enum UserMatchStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending = "pending",
}
