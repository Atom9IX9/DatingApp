
import userReducer, {
  setUserAuth,
  setUserAccountInfo,
  registerUserPersonalInfo,
  setUserDescription,
} from "../model/user.slice";
import { Sex, User } from "@/entities/user";
import { Hobby } from "../types/user";

describe("User Entity: Redux Reducer Tests", () => {
// State shape for initial.
  const initialState: User = {
    uid: "",
    firstName: "",
    lastName: "",
    gender: Sex.Custom,
    age: 0,
    dateOfBD: "",
    auth: {
      authId: 0,
      email: "",
    },
    description: "",
    hobbies: [],
  };

  it("should return the initial state when passed an unknown action", () => {
    expect(userReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should correctly handle setUserAuth action (setting auth data)", () => {
    const authData = { authId: 81, email: "test@gmail.com" };
// State shape for next.
    const nextState = userReducer(initialState, setUserAuth(authData));

    expect(nextState.auth).toEqual(authData);
    expect(nextState.firstName).toBe("");
  });

  it("should correctly handle setUserAccountInfo action (basic account info)", () => {
    const accountInfo = {
      firstName: "Firstname",
      lastName: "Lastname",
      uid: "ff-0kqPS6VVaAPc2drQlJ",
    };
// State shape for next.
    const nextState = userReducer(
      initialState,
      setUserAccountInfo(accountInfo),
    );

    expect(nextState.firstName).toBe("Firstname");
    expect(nextState.lastName).toBe("Lastname");
    expect(nextState.uid).toBe("ff-0kqPS6VVaAPc2drQlJ");
  });

  it("should correctly handle registerUserPersonalInfo action (personal info on onboarding step)", () => {
    const personalInfo = {
      uid: "ff-0kqPS6VVaAPc2drQlJ",
      firstName: "Firstname",
      lastName: "Lastname",
      gender: Sex.Custom,
      age: 20,
      dateOfBD: "2006-05-04",
    };

// State shape for next.
    const nextState = userReducer(
      initialState,
      registerUserPersonalInfo(personalInfo),
    );

    expect(nextState.firstName).toBe("Firstname");
    expect(nextState.lastName).toBe("Lastname");
    expect(nextState.age).toBe(20);
    expect(nextState.dateOfBD).toBe("2006-05-04");
    expect(nextState.gender).toBe(Sex.Custom);
  });

  it("should correctly handle setUserDescription action (adding profile description and hobbies)", () => {
    const descriptionData = {
      description: "Software developer, working on my course project",
      hobbies: [
        { id: 1, name: "Coding" },
        { id: 2, name: "Gaming" },
      ] as Hobby[],
    };

// State shape for next.
    const nextState = userReducer(
      initialState,
      setUserDescription(descriptionData),
    );

    expect(nextState.description).toBe(
      "Software developer, working on my course project",
    );
    expect(nextState.hobbies).toHaveLength(2);
    expect(nextState.hobbies ? nextState.hobbies[0].name : null).toBe("Coding");
  });
});
