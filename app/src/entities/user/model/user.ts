export type User = {
  uid: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: UserGender;
  location?: UserLocation;
  description?: string;
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

export type UserAuthInfo = User & {
  dateOfBD: string;
  email: string;
};

export type PublicUser = User & {
  isOnline: boolean;
  matchStatus?: UserMatchStatus;
};
export enum UserMatchStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending = "pending",
}
