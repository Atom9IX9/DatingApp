// Exported type alias used for typing shared data shapes.
export type User = UserInfo & { auth: UserAuth };

// Exported type alias used for typing shared data shapes.
export type UserInfo = {
  age: number;
  dateOfBD: string;
  gender: Sex;
  // location?: UserLocation;
  description?: string;
  hobbies?: Hobby[];
} & UserAccountInfo;

// Exported type alias used for typing shared data shapes.
export type Hobby = {
  id: number;
  name: string;
};

// Exported type alias used for typing shared data shapes.
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

// Exported type alias used for typing shared data shapes.
export type UserLocation = {
  country: string;
  region: string;
  city?: string;
};

// Exported type alias used for typing shared data shapes.
export type UserAuth = {
  email: string;
  authId: number;
};

export enum UserMatchStatus {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending = "pending",
}
