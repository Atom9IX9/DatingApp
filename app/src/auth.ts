import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { API } from "./shared/api/authAPIInstance";
import { LoginResponse } from "./features/auth/signIn/api/signInAPI";
import { HttpError } from "./shared/errors";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const api = new API();

        const res = await api.post<LoginResponse, typeof credentials>(
          "auth/login",
          credentials,
        );

        if (res.error) {
          // Invalid credentials
          throw new HttpError(res.error.statusCode, res.error.message);
        }

        const accessToken = res.data?.accessToken;
        const refreshToken = res.setCookies?.getValues()[0];

        return {
          id: res.data?.user?.uid,
          email: res.data?.authCredentials.email,
          refreshToken,
          accessToken,
        }; //todo: user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      console.log("token: ========================", JSON.stringify(token));
      if (account && user) {
        console.log("user: ========================", JSON.stringify(user));

        console.log(
          "account: ========================",
          JSON.stringify(account),
        );

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      return token;
    },
  },
});
