
import { TValidationFunction } from "@/shared/types";

// Validation helper that checks whether email input is valid.
export const validateEmail: TValidationFunction = (value) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return reg.test(value) || "Invalid email address";
};
