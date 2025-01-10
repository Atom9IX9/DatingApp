import { RootState } from "@/lib/store/store";

export const selectAuth = (state: RootState) => state.auth.user
export const selectFetchAuthStatus = (state: RootState) => state.auth.fetchAuthStatus