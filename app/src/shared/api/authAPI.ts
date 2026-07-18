"use server";

import { cookies } from "next/headers";

import { AuthAPI } from "./authAPIInstance";

export const authAPI = async () => {
  const cookiesStorage = await cookies();
  return new AuthAPI(cookiesStorage);
};
