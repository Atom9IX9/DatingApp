import { HttpError } from "../../errors";
import { getShortValuesFromSetCookies } from "../../lib/helpers/getShortValuesFromSetCookies";
import { APIResponse } from "../../types";

export class ApiClientRequest implements IApiClientRequest {
  private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

  constructor(
    private readonly endpoint: string,
    private readonly options?: RequestInit,
  ) {}

  async execute<D>(extraOptions?: RequestInit): Promise<APIResponse<D>> {
    const res = await fetch(`${this.baseUrl}/${this.endpoint}`, {
      ...this.options,
      ...extraOptions,
      headers: {
        "Content-Type": "application/json",
        ...this.options?.headers,
        ...(extraOptions?.headers ?? {}),
      },
    });

    if (!res.ok) {
      await this.throwResponseError(res);
    }

    return await this.createApiClientResponse(res);
  }

  private async createApiClientResponse<D>(response: Response) {
    const data = (await response.json()) as D;

    return {
      data,
      setCookies: {
        getFullValues: () => response.headers.getSetCookie(),
        getValues: () => getShortValuesFromSetCookies(response.headers),
      },
    };
  }

  private async throwResponseError(response: Response) {
    const errorData: HttpError = await response.json().catch(() => null);
    throw new HttpError(errorData.statusCode, errorData.message);
  }
}

export interface IApiClientRequest {
  execute<D>(extraOptions?: RequestInit): Promise<APIResponse<D>>;
}
