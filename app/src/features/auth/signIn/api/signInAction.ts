"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export async function loginAction(
  email: string,
  password: string,
): LoginActionResponse {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    let message;
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          message = "Invalid email or password";
          break;
        }
        case "CallbackRouteError": {
          message = error.cause?.err?.message;
          break;
        }
        default: {
          message = "Unexpected error";
        }
      }
    }

    return {
      success: false,
      message,
    };
  }
}

type LoginActionResponse = Promise<{ success: boolean; message?: string }>;
