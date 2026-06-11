
import { renderHook, act } from "@testing-library/react";
import { useRegisterCredentials } from "../hooks/useRegisterCredentials";
import Cookies from "js-cookie";

const mockUnwrap = jest.fn();
const mockRegisterCredentialsMutation = jest.fn(() => [
  jest.fn().mockReturnValue({ unwrap: mockUnwrap }),
  { status: "uninitialized" },
]);

jest.mock("../api/signUpAPI", () => ({
  useRegisterCredentialsMutation: () => mockRegisterCredentialsMutation(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("Hooks: useRegisterCredentials", () => {
  it("should call Cookies.set with accessToken upon successful registration", async () => {
    const fakeResponse = { accessToken: "fake_jwt_token", auth: { authId: 1, email: "t@t.com" } };
    mockUnwrap.mockResolvedValueOnce(fakeResponse);

    const { result } = renderHook(() => useRegisterCredentials());

    let response;
    await act(async () => {
      response = await result.current.registerCredentials({
        email: "test@test.com",
        password: "password123",
      });
    });

    expect(response).toEqual(fakeResponse);
    expect(Cookies.set).toHaveBeenCalledWith("accessToken", "fake_jwt_token", {
      secure: true,
      sameSite: "strict",
    });
  });
});