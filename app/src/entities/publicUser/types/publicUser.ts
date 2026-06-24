import { Avatar } from "@/entities/avatar";
import { Sex } from "@/entities/user";

// Exported type alias used for typing shared data shapes.
export type PublicUser = {
  uid: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Sex;
  isOnline: boolean;
  description?: string;
  location?: {
    country: string;
    region: string;
    city?: string;
  };
  avatar: Avatar;
};
