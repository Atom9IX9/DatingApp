import { User } from "@/entities/user";

export type UserAuthResponse = {
  user: User;
  token?: string;
};