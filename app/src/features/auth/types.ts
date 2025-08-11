import { User } from "@/entities";

export type UserAuthResponse = {
  user: User;
  token?: string;
};