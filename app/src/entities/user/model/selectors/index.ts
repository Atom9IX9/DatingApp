import { User } from "../../types/user";

export const selectUser = (state: UserState) => state.user;

export type UserState = {
  user: User;
};
