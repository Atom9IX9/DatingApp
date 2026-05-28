export type User = UserInfo & { auth: UserAuth };

export type UserInfo = {
  age: number;
  dateOfBD: string;
  gender: Sex;
  // location?: UserLocation;
  description?: string;
  hobbies?: Hobby[];
} & UserAccountInfo;

export type Hobby = {
  id: number;
  name: string;
};

export type UserAccountInfo = {
  uid: string;
  firstName: string;
  lastName: string;
  avatar?: {
    posX: number;
    posY: number;
    scale: number;
    url: string;
  };
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
