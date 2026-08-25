import { ApiClient } from "./apiClient";

describe("ApiClient", () => {
  let buildReq: jest.Mock;
  let api: ApiClient;

  const options = {
    headers: {
      Authorization: "Bearer token",
    },
  };

  beforeEach(() => {
    buildReq = jest.fn();
    api = new ApiClient(buildReq);
  });

  it("should build GET request", () => {
    api.get("/endpoint");

    expect(buildReq).toHaveBeenCalledWith("/endpoint", "GET", undefined);
  });

  it("should build GET request with options", () => {
    api.get("/endpoint", options);

    expect(buildReq).toHaveBeenCalledWith("/endpoint", "GET", options);
  });

  it("should build POST request with body and options", () => {
    const body = {
      email: "test@test.com",
      password: "123456",
    };

    api.post("/auth/login", body, options);

    expect(buildReq).toHaveBeenCalledWith("/auth/login", "POST", {
      body,
      ...options,
    });
  });
});
