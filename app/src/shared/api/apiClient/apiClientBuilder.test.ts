import { HttpResponse } from "msw";

import { HttpError } from "@/shared/errors";
import { observeRequestState } from "@/shared/tests";

import { ApiClientBuilder } from "./apiClientBuilder";

describe("ApiClientBuilder", () => {
  const createClient = () => new ApiClientBuilder().build();

  it("should build ApiClient", () => {
    const client = createClient();

    expect(client).toBeDefined();
    expect(client).toHaveProperty("get");
    expect(client).toHaveProperty("post");
  });

  it("should inject headers into request", async () => {
    const reqState = observeRequestState("get", "*/users");

    const client = new ApiClientBuilder()
      .setHeaders({
        Authorization: "Bearer token",
      })
      .build();

    await client.get("users");

    expect(reqState.request?.headers.get("Authorization")).toBe("Bearer token");
  });

  it("should merge injected headers with request headers", async () => {
    const reqState = observeRequestState("get", "*/users");

    const client = new ApiClientBuilder()
      .setHeaders({
        Authorization: "Bearer token",
      })
      .build();

    await client.get("users", {
      headers: {
        "X-Custom-Header": "custom-value",
      },
    });

    expect(reqState.request?.headers.get("Authorization")).toBe("Bearer token");
    expect(reqState.request?.headers.get("X-Custom-Header")).toBe(
      "custom-value",
    );
  });

  it("should allow request headers to override injected headers", async () => {
    const reqState = observeRequestState("get", "*/users");

    const client = new ApiClientBuilder()
      .setHeaders({
        Authorization: "Bearer builder-token",
      })
      .build();

    await client.get("/users", {
      headers: {
        Authorization: "Bearer request-token",
      },
    });

    expect(reqState.request?.headers.get("Authorization")).toBe(
      "Bearer request-token",
    );
  });

  it("should serialize object body to JSON", async () => {
    const reqState = observeRequestState("post", "*/users");

    const body = {
      email: "test@test.com",
      password: "123456",
    };

    const client = createClient();

    await client.post("users", body);

    expect(reqState.request).not.toBeNull();
    expect(await reqState.request!.json()).toEqual(body);
  });

  it("should pass FormData body without JSON serialization", async () => {
    const reqState = observeRequestState("post", "*/users");

    const formData = new FormData();
    formData.append("username", "john");

    const client = createClient();

    await client.post("users", formData);

    expect(reqState.request).not.toBeNull();
    expect(await reqState.request!.formData()).toEqual(formData);
    expect(reqState.request!.headers.get("Content-Type")).not.toBe(
      "application/json",
    );
  });

  it("should rethrow HttpError when no interceptor is configured", async () => {
    observeRequestState("post", "*/users", () =>
      HttpResponse.json(
        {
          statusCode: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      ),
    );

    const client = createClient();

    await expect(client.get("users")).rejects.toMatchObject({
      statusCode: 401,
      message: "Unauthorized",
    });
  });

  it("should intercept HttpError", async () => {
    const interceptor = jest.fn(async (error, retry) => {
      expect(error).toBeInstanceOf(HttpError);

      return retry({});
    });

    observeRequestState("get", "*/users", () =>
      HttpResponse.json(
        {
          statusCode: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      ),
    );

    const client = new ApiClientBuilder()
      .withErrorInterceptor(interceptor)
      .build();

    await expect(client.get("users")).rejects.toThrow(HttpError);

    expect(interceptor).toHaveBeenCalledTimes(1);
  });

  it("should retry request through error interceptor", async () => {
    let attempts = 0;

    observeRequestState("get", "*/users", () => {
      attempts++;
      if (attempts === 1) {
        return HttpResponse.json(
          {
            statusCode: 401,
            message: "Unauthorized",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json({
        success: true,
      });
    });

    const interceptor = jest.fn(async (_error, retry) => {
      return retry({});
    });

    const client = new ApiClientBuilder()
      .withErrorInterceptor(interceptor)
      .build();

    const response = await client.get<{ success: boolean }>("/users");

    expect(response.data).toEqual({
      success: true,
    });

    expect(interceptor).toHaveBeenCalledTimes(1);
    expect(attempts).toBe(2);
  });
});
