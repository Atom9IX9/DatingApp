
import { useLoginMutation } from "../api/signInAPI";
import Cookies from "js-cookie";
import { SignInData } from "../types/form";

// Custom hook that handles Login logic.
export const useLogin = () => {
  const [login, result] = useLoginMutation();

  const loginWithCookie = async (credentials: SignInData) => {
    const response = await login(credentials).unwrap();

    if (response.accessToken) {
      Cookies.set("accessToken", response.accessToken, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response;
  };

  return { login: loginWithCookie, result };
};
