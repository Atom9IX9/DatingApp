import { User } from "@/entities";

export const checkAuth: CheckAuthFn = async (token?: string) => {
  if (!token) {
    return { statusCode: 401 };
  }
  try {
    const res = await fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.ok) {
      return { user: await res.json() };
    } else {
      return { statusCode: res.status };
    }
  } catch (e: any) {
    return { statusCode: e.code };
  }
};


export type AuthApiError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
export type CheckAuthResponse = { user?: User; statusCode?: number };
export type CheckAuthFn = (token?: string) => Promise<CheckAuthResponse>;
