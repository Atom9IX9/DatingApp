import { http, HttpResponse } from "msw";

import { HttpError } from "@/shared/errors";

import { ApiClientRequest } from "./request";

import { server } from "@/shared/tests";

describe("ApiClientRequest", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const captureRequest = (customResponse?: CustomResponse) => {
    const state: { request: Request | null } = { request: null };

    server.use(
      http.post("*/login", async ({ request }) => {
        state.request = request.clone();

        if (customResponse?.status && customResponse.status >= 400) {
          return HttpResponse.json(
            customResponse.body ?? {
              statusCode: customResponse.status,
              message: "Error",
            },
            { status: customResponse.status },
          );
        }

        return HttpResponse.json(
          customResponse?.body ?? { accessToken: "Bearer token" },
        );
      }),
    );

    return state;
  };

  const executeRequest = async (
    options?: RequestInit,
    extraOptions?: RequestInit,
    customResponse?: CustomResponse,
  ) => {
    const requestState = captureRequest(customResponse);
    const client = new ApiClientRequest("/login", {
      method: "POST",
      ...options,
    });
    const result = await client.execute<unknown>(extraOptions);

    if (!requestState.request) {
      throw new Error("Request was not captured by MSW handler");
    }

    return { response: result, request: requestState.request };
  };

  it("should execute request and return expected data", async () => {
    const expectData = {
      accessToken: "Bearer token",
    };

    const { response } = await executeRequest();

    expect(response.data).toEqual(expectData);
  });

  it("should execute request and return data with correct response-methods", async () => {
    const { response } = await executeRequest();

    expect(response.responseCookies).toHaveProperty("getFullValues");
    expect(response.responseCookies).toHaveProperty("getShortValues");
  });

  it("should set Content-Type header to application/json for non-FormData requests", async () => {
    const { request } = await executeRequest();

    expect(request?.headers.get("Content-Type")).toBe("application/json");
  });

  it("should omit application/json Content-Type header when body is FormData", async () => {
    const formData = new FormData();
    formData.append("username", "john_doe");

    const { request } = await executeRequest({ body: formData });

    expect(request.headers.get("Content-Type")).not.toBe("application/json");
  });

  it("should merge initial options and extraOptions headers correctly", async () => {
    const { request } = await executeRequest(
      { headers: { "X-Base-Header": "BaseValue" } },
      { headers: { "X-Extra-Header": "ExtraValue" } },
    );

    expect(request.headers.get("X-Base-Header")).toBe("BaseValue");
    expect(request.headers.get("X-Extra-Header")).toBe("ExtraValue");
  });

  it("should throw HttpError with status code and message when response is not ok", async () => {
    const errorBody = { statusCode: 401, message: "Invalid credentials" };

    const action = () =>
      executeRequest(undefined, undefined, { status: 401, body: errorBody });

    await expect(action()).rejects.toThrow(HttpError);
    await expect(action()).rejects.toMatchObject({
      statusCode: 401,
      message: "Invalid credentials",
    });
  });
});

type CustomResponse = {
  body?: unknown;
  status?: number;
};
