"use server";

import { cookies } from "next/headers";

import { ApiClient, baseApiClient } from "./apiClient";

export const authAction = async (childAction: (api: ApiClient) => unknown) => {
  const cookiesStorage = await cookies();

  const accessToken = cookiesStorage.get("accessToken")?.value;

  const authApi = baseApiClient.injectHeaders({
    Authorization: `Bearer ${accessToken}`,
  });

  return childAction(authApi);
};
