import { APIResponse } from "../../types";
import { HttpError } from "../../errors";

import { ApiClientRequest } from "./request";
import { ApiClient, FetchOptions, Method } from "./apiClient";

export class ApiClientBuilder implements IApiClientBuilder {
  constructor(
    private readonly injectedHeaders: HeadersInit = {},
    private readonly errorInterceptor: ErrorInterceptor = null,
  ) {}

  setHeaders(headers: HeadersInit): ApiClientBuilder {
    return new ApiClientBuilder(
      {
        ...this.injectedHeaders,
        ...headers,
      },
      this.errorInterceptor,
    );
  }

  withErrorInterceptor(interceptor: ErrorInterceptor): ApiClientBuilder {
    return new ApiClientBuilder(this.injectedHeaders, interceptor);
  }

  build(): ApiClient {
    return new ApiClient(this.buildRequest.bind(this));
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

  private interceptError<D>(
    error: unknown,
    request: ApiClientRequest,
  ): APIResponse<D> {
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

export const baseApiClient = new ApiClientBuilder().build();

interface IApiClientBuilder {
  withErrorInterceptor(interceptor: ErrorInterceptor): ApiClientBuilder;
  setHeaders(headers: HeadersInit): ApiClientBuilder;
  build(): ApiClient;
}

type ErrorInterceptor =
  | (<D>(
      error: HttpError,
      retry: (req: RequestInit) => APIResponse<D>,
    ) => APIResponse<D>)
  | null;
