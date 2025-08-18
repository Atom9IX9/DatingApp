import { UserLocation } from "@/entities";

export const getUserStringLocation = (loc: UserLocation) =>
  `${loc.country}, ${loc.region}${loc.city ? `, ${loc.city}` : ""}`;
