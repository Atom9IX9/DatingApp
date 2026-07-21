import "next-auth/jwt";
import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    accessToken?: string;
    error?: unknown;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
  }
}

export {};
