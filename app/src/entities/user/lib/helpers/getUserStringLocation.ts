import { UserLocation } from "@/entities/user/model/user";

export const getUserStringLocation = (loc: UserLocation) =>
  `${loc.country}, ${loc.region}${loc.city ? `, ${loc.city}` : ""}`;
