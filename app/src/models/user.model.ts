export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: TGender;
  dateOfBD: string;
}

export type TGender = "male" | "female";
