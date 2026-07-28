import { User } from "@/entities/user";

// Exported type alias used for typing shared data shapes.
export type UserAuthResponse = {
  user: User;
  token?: string;
};
