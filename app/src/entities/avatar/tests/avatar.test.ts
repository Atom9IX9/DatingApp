import avatarReducer, { setAvatar } from "../model/avatar.slice"; // змініть шлях за потреби
import { Avatar } from "../types";

describe("Avatar Entity: Redux Reducer Tests", () => {
  // State shape for initial.
  const initialState: Avatar = {
    posX: 0,
    posY: 0,
    scale: 1,
    url: "",
  };

  it("should return the initial state when passed an unknown action", () => {
    expect(avatarReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should correctly handle setAvatar action (updating positioning and url)", () => {
    const newAvatarData: Avatar = {
      posX: 12,
      posY: -45,
      scale: 1.5,
      url: "https://storage.cdn.com/uploads/avatar_123.png",
    };

    // State shape for next.
    const nextState = avatarReducer(initialState, setAvatar(newAvatarData));

    expect(nextState.posX).toBe(12);
    expect(nextState.posY).toBe(-45);
    expect(nextState.scale).toBe(1.5);
    expect(nextState.url).toBe(
      "https://storage.cdn.com/uploads/avatar_123.png",
    );
  });
});
