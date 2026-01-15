import type { UserIdentifiers, UserInfo, UserMatchStatus } from "@x-entities/user/types/user";

export type PublicUser = {
  isOnline: boolean;
  matchStatus?: UserMatchStatus;
} & UserInfo & UserIdentifiers;