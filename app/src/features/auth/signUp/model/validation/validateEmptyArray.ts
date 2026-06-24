import { TArrayValidationFunction } from "@/shared/types";

// Validation helper that checks whether emptyarray input is valid.
export const validateEmptyArray: TArrayValidationFunction = (val) => {
  if (val.length === 0) {
    return "Add at least one tag";
  }

  return true;
};
