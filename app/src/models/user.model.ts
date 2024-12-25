type User = {
  uid: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBD: string; //~fet exclude
  email: string; //~fet exclude
  gender: Gender;
  location?: TLocation;
  isOnline: boolean;
  description?: string;
  matchStatus?: TMatchStatus;
}

export  default User 
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
