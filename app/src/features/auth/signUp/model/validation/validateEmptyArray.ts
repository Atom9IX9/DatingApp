import { TArrayValidationFunction, TValidationFunction } from "@/shared/types";

export const validateEmptyArray: TArrayValidationFunction = (val) => {
  if (val.length === 0) {
    return "Add at least one tag";
  }

  return true;
};
