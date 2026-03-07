import { Dayjs } from "dayjs";

export type CredentialsData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserPersonalInfoFormData = {
  firstName: string;
  lastName: string;
  dateOfBD: Dayjs | null;
  sex: Sex;
  genderInfo?: string;
}

export enum Sex {
  Male = "Male",
  Female = "Female",
  Custom = "Custom"
}