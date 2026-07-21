"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export async function loginAction(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/home",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }
    }

    throw error;
  }
}
