import { Dayjs } from "dayjs";

import { Sex } from "@/entities/user";

// Exported type alias used for typing shared data shapes.
export type CredentialsData = {
  email: string;
  password: string;
  confirmPassword: string;
};

// Exported type alias used for typing shared data shapes.
export type UserPersonalInfoFormData = {
  firstName: string;
  lastName: string;
  dateOfBD: Dayjs | null;
  sex: Sex;
  genderInfo?: string;
};
