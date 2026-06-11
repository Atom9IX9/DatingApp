
import { UserLocation } from "@/entities/user";

// Getter helper that returns computed data for userstringlocation.
export const getUserStringLocation = (loc: UserLocation) =>
  `${loc.country}, ${loc.region}${loc.city ? `, ${loc.city}` : ""}`;
