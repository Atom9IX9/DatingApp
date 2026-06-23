
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import CredentialsFormController from "../ui/credentialsForm/CredentialsFormController.tsx";

const mockRegisterCredentials = jest.fn();
jest.mock("@/features/auth/signUp/api/signUpAPI", () => ({
  useRegisterCredentialsMutation: () => [
    mockRegisterCredentials,
    { status: "uninitialized" }
  ],
}));

describe("Components: CredentialsFormController", () => {
  // Додаємо вбудований у Node.js fetch перед запуском тестів
  beforeAll(() => {
    if (!global.fetch) {
      const { fetch, Headers, Request, Response } = require("node:undici");
      global.fetch = fetch;
      global.Headers = Headers;
      global.Request = Request;
      global.Response = Response;
    }
  });

  it("should set an error if password and confirmPassword do not match", async () => {
    const element = React.createElement(CredentialsFormController, { onSuccess: jest.fn() });
    const { container } = render(element);

    // Стабільний пошук елементів через атрибут name
    const emailInput = container.querySelector('input[name="email"]');
    const passwordInput = container.querySelector('input[name="password"]');
    const confirmPasswordInput = container.querySelector('input[name="confirmPassword"]');
// Button component used for an action in src\features\auth\signUp\tests\descriptionController.test.tsx.
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    if (!emailInput || !passwordInput || !confirmPasswordInput) {
      throw new Error("Required form fields were not found in the DOM");
    }

    // Заповнюємо поля
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "different123" } });

    // Клікові події
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
    
    expect(mockRegisterCredentials).not.toHaveBeenCalled();
  });
});