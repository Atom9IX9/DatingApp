import { ApiClient } from "./apiClient";

describe("ApiClient", () => {
  const buildReq = jest.fn();

  const api = new ApiClient(buildReq);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should build GET request", () => {
    api.get("/endpoint");

    expect(buildReq).toHaveBeenCalledWith("/endpoint", "GET", undefined);
  });

  it("should build GET request with options", () => {
    const options = {
      headers: {
        Authorization: "Bearer token",
      },
    };

    api.get("/endpoint", options);

    expect(buildReq).toHaveBeenCalledWith("/endpoint", "GET", options);
  });

  it("should build POST request with body", () => {
    const body = {
      email: "test@test.com",
      password: "123456",
    };

    api.post("/auth/login", body);

    expect(buildReq).toHaveBeenCalledWith("/auth/login", "POST", {
      body,
    });
  });
});
