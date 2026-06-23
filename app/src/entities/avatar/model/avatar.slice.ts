import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Avatar } from "../types";

// State shape for initial.
const initialState: Avatar = {
  posX: 0,
  posY: 0,
  scale: 1,
  url: "",
};

// Redux slice that manages the avatar state.
const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<Avatar>) => {
      state.posX = action.payload.posX;
      state.posY = action.payload.posY;
      state.scale = action.payload.scale;
      state.url = action.payload.url;
    },
  },
});

// Redux slice that manages avatar state.
export default avatarSlice.reducer;
export const { setAvatar } = avatarSlice.actions;
export type AvatarStateSchema = {
  avatar: Avatar;
}
