import { TDateValidationFunction } from "@/shared/types";
import dayjs from "dayjs";

export const validateAdult: TDateValidationFunction = (value) => {
   const birthDate = dayjs(value);
  if (!birthDate.isValid()) return "Invalid date";

  const age = dayjs().diff(birthDate, "year");

  return age >= 18 || "You must be at least 18 years old";
};
