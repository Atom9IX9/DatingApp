import type { UserIdentifiers, UserInfo, UserMatchStatus } from "../../user/types/user";

export type PublicUser = {
  isOnline: boolean;
  matchStatus?: UserMatchStatus;
} & UserInfo & UserIdentifiers;