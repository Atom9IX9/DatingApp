import { TInitialState } from "../user.slice";

export const selectUser = (state: UserState) => state.user.user;

export type UserState = {
  user: TInitialState;
};
