import { RegisterReqBody, useRegisterMutation } from "../api/signUpAPI";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [register, result] = useRegisterMutation();

  const registerWithCookie = async (credentials: RegisterReqBody) => {
    const response = await register(credentials).unwrap();
    
    if (response.token) {
      Cookies.set("token", response.token, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response;
  };

  return { registerUser: registerWithCookie, ...result };
};