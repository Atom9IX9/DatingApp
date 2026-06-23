
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import CredentialsFormController from "../ui/credentialsForm/CredentialsFormController.tsx";

const mockRegisterCredentials = jest.fn();
jest.mock("../hooks/useRegisterCredentials", () => ({
  useRegisterCredentials: () => ({
    registerCredentials: mockRegisterCredentials,
    status: "uninitialized",
  }),
}));

describe("Components: CredentialsFormController", () => {
  it("should set an error if password and confirmPassword do not match", async () => {
    render(<CredentialsFormController onSuccess={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: "different123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    expect(mockRegisterCredentials).not.toHaveBeenCalled();
  });
});
