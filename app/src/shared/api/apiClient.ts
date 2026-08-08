import { APIResponse } from "../types";
import { HttpError } from "../errors";

import { ApiClientRequest } from "./request";

export class ApiClient implements ApiClientBuilder {
  constructor(
    private readonly injectedHeaders: HeadersInit = {},
    private errorInterceptor: ErrorInterceptor = null,
  ) {}

  setHeaders(headers: HeadersInit) {
    return new ApiClient(
      {
        ...this.injectedHeaders,
        ...headers,
      },
      this.errorInterceptor,
    );
  }

  onError(interceptor: ErrorInterceptor) {
    return new ApiClient(this.injectedHeaders, interceptor);
  }

  // TODO: Remove from builder using CRUD
  async get<D>(endpoint: string) {
    return await this.buildRequest<D>(endpoint, "GET");
  }

  async post<D, B>(endpoint: string, body: B, options?: PublicOptions) {
    return await this.buildRequest<D>(endpoint, "POST", {
      ...options,
      body,
    });
  }

  private async buildRequest<D>(
    endpoint: string,
    method: Method,
    options?: FetchOptions,
  ): APIResponse<D> {
    const request = new ApiClientRequest(endpoint, {
      ...options,
      method,
      headers: {
        ...this.injectedHeaders,
        ...(options?.headers ?? {}),
      },
      body:
        options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    try {
      const res = await request.execute<D>();

      return res;
    } catch (error) {
      return this.interceptError<D>(error, request);
    }
  }

  private interceptError<D>(error: unknown, request: ApiClientRequest) {
    if (error instanceof HttpError && this.errorInterceptor) {
      return this.errorInterceptor(error, async (extraOptions) => {
        const retryRes = await request.execute<D>(extraOptions);

        return retryRes;
      });
    } else {
      throw error;
    }
  }
}

export const baseApiClient = new ApiClient();

interface ApiClientBuilder {
  onError(interceptor: ErrorInterceptor): ApiClientBuilder;
  setHeaders(headers: HeadersInit): ApiClientBuilder;
}

type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
type PublicOptions = Omit<RequestInit, "body">;
type FetchOptions = PublicOptions & {
  body?: unknown;
};
type ErrorInterceptor =
  | (<D>(
      error: HttpError,
      retry: (req: RequestInit) => APIResponse<D>,
    ) => APIResponse<D>)
  | null;
