export type { User, UserAuth, UserLocation } from "./types/user";
export { UserGender } from "./types/user";

export { default as userReducer, setUser } from "./model/user.slice";

export { selectUser } from "./model/selectors";
