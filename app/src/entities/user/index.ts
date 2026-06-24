// Exported type alias used for typing shared data shapes.
export type {
  User,
  UserLocation,
  UserAccountInfo,
  UserAuth,
  Hobby,
} from "./types/user";
export { Sex } from "./types/user";

export {
  default as userReducer,
  setUserAuth,
  setUserAccountInfo,
  registerUserPersonalInfo,
  setUserDescription,
} from "./model/user.slice";

export { selectUser } from "./model/selectors";
