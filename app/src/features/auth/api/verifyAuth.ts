import { CheckAuthResponseData } from "../types/types";

// Async function that validates the auth token by calling the backend.
export const verifyAuth: VerifyAuthFn = async (token?: string) => {
  // Do not call the backend when the auth token is missing.
  if (!token) {
    // Return null for invalid or missing input.
    return null;
  }

  // Perform an HTTP request to the backend API and wait for the response.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    // Return a typed response payload with either data or error.
    return { data: undefined, error: await res.json() };
  }
  // Return a typed response payload with either data or error.
  return { data: await res.json(), error: undefined };
};

// Exported type alias used for typing shared data shapes.
export type VerifyAuthResponse = {
  data?: CheckAuthResponseData;
  error?: {
    message: string;
    statusCode: number;
  };
};
// Exported type alias used for typing shared data shapes.
export type VerifyAuthFn = (
  token?: string,
) => Promise<VerifyAuthResponse | null>;
