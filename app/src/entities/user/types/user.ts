export type User = UserInfo & { auth: UserAuth };

export type UserInfo = {
  age: number;
  dateOfBD: string;
  gender: Sex;
  // location?: UserLocation;
  //description?: string;
} & UserAccountInfo;

export type UserAccountInfo = {
  uid: string;
  firstName: string;
  lastName: string;
};

export enum Sex {
  Male = "Male",
  Female = "Female",
  Custom = "Custom",
}

export type UserLocation = {
  country: string;
  region: string;
  city?: string;
};

export type UserAuth = {
  email: string;
  authId: number;
};

export enum UserMatchStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending = "pending",
}
