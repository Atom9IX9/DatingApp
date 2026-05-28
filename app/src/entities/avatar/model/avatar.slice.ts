import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Avatar } from "../types";

const initialState: Avatar = {
  posX: 0,
  posY: 0,
  scale: 1,
  url: "images/avatars/42e95141-c92d-4f69-ab73-c8b9ce7a37b6.png",
};

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

export default avatarSlice.reducer;
export const { setAvatar } = avatarSlice.actions;
