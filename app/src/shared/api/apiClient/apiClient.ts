import { APIResponse } from "../../types";

export class ApiClient implements IApiClient {
  constructor(private readonly buildRequest: BuildRequest) {}

  get<D>(endpoint: string, options: PublicOptions): APIResponse<D> {
    return this.buildRequest(endpoint, "GET", options);
  }

  post<D, B>(
    endpoint: string,
    body: B,
    options?: PublicOptions,
  ): APIResponse<D> {
    return this.buildRequest<D>(endpoint, "POST", {
      ...options,
      body,
    });
  }
}

interface IApiClient {
  get<D>(endpoint: string, options?: PublicOptions): APIResponse<D>;
  post<D, B>(
    endpoint: string,
    body: B,
    options?: PublicOptions,
  ): APIResponse<D>;
}

export type PublicOptions = Omit<RequestInit, "body">;
export type BuildRequest = <D>(
  endpoint: string,
  method: Method,
  options?: FetchOptions,
) => APIResponse<D>;
export type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
export type FetchOptions = PublicOptions & {
  body?: unknown;
};
