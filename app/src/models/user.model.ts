type User = {
  uid: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  location?: TLocation;
  description?: string;
};

export type UserAuthInfo = User & {
  dateOfBD: string;
  email: string;
};

export type PublicUser = User & {
  isOnline: boolean;
  matchStatus?: TMatchStatus;
};

export default User;
export enum Gender {
  Male = "male",
  Female = "female",
}
export type TLocation = {
  country: string;
  region: string;
  city?: string;
};
export enum TMatchStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending = "pending",
}
