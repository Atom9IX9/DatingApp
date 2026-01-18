import { UserLocation } from "@/entities/user";

export const getUserStringLocation = (loc: UserLocation) =>
  `${loc.country}, ${loc.region}${loc.city ? `, ${loc.city}` : ""}`;
