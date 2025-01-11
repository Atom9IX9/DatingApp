import { TLocation } from "@/models/user.model";

export const getUserStringLocation = (loc: TLocation) =>
  `${loc.country}, ${loc.region}${loc.city ? `, ${loc.city}` : ""}`;
