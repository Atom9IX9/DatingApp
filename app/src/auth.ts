import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { API } from "./shared/api/authAPIInstance";
import { LoginResponse } from "./features/auth/signIn/api/signInAPI";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          return null;
        }

        return {
          id: res.data?.user?.uid,
          accessToken: res.data?.accessToken,
          email: res.data?.authCredentials.email,
        }; //todo: user
      },
    }),
  ],
  callbacks: {},
});
