import { RegisterCredentialsReqBody, useRegisterCredentialsMutation } from "../api/signUpAPI";
import Cookies from "js-cookie";

export const useRegisterCredentials = () => {
  const [registerCredentials, result] = useRegisterCredentialsMutation();

  const registerWithCookie = async (credentials: RegisterCredentialsReqBody) => {
    const response = await registerCredentials(credentials).unwrap();
    
    if (response.accessToken) {
      Cookies.set("accessToken", response.accessToken, {
        secure: true,
        sameSite: "strict",
      });
    }

    return response;
  };

  return { registerCredentials: registerWithCookie, ...result };
};