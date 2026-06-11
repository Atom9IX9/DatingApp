
import { User } from "../../types/user";

export const selectUser = (state: UserState) => state.user;

// Exported type alias used for typing shared data shapes.
export type UserState = {
  user: User;
};
