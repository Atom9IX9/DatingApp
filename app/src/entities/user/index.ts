export type {
  User,
  UserLocation,
  UserAccountInfo,
  UserAuth,
} from "./types/user";
export { Sex } from "./types/user";

export {
  default as userReducer,
  setUserAuth,
  setUserAccountInfo,
  registerUserPersonalInfo,
} from "./model/user.slice";

export { selectUser } from "./model/selectors";
