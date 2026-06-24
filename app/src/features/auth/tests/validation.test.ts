import dayjs from "dayjs";

import { validateEmail } from "../model/validation/validateEmail";
import { validateAdult } from "../model/validation/validateAdult";
import { validateEmptyArray } from "../signUp/model/validation/validateEmptyArray";

describe("Shared/Features: Validation Helpers", () => {
  describe("validateEmail", () => {
    it("should return true for a valid email address", () => {
      expect(validateEmail("user@example.com")).toBe(true);
    });

    it("should return an error message for an invalid email", () => {
      expect(validateEmail("invalid-email")).toBe("Invalid email address");
    });
  });

  describe("validateAdult", () => {
    it("should return true if the user is 18 years old or older", () => {
      const date18YearsAgo = dayjs().subtract(18, "year");
      expect(validateAdult(date18YearsAgo)).toBe(true);
    });

    it("should return an error message if the user is under 18", () => {
      const date17YearsAgo = dayjs().subtract(17, "year");
      expect(validateAdult(date17YearsAgo)).toBe(
        "You must be at least 18 years old",
      );
    });

    it("should return an error message for an invalid date", () => {
      const invalidDate = dayjs("invalid-date");
      expect(validateAdult(invalidDate)).toBe("Invalid date");
    });
  });

  describe("validateEmptyArray", () => {
    it("should return true if the array has elements", () => {
      expect(validateEmptyArray(["Coding", "Gaming"])).toBe(true);
    });

    it("should return an error message if the array is empty", () => {
      expect(validateEmptyArray([])).toBe("Add at least one tag");
    });
  });
});
