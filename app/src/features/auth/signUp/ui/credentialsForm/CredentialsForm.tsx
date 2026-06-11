
"use client";
import React from "react";
import style from "./credentialsForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { validateEmail } from "../../../../auth";
import { BaseBtn, StyledLink, TextField } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import { Box } from "@mui/material";
import HydratedForm from "../../../ui/HydratedForm";

// Form component that captures credentials input.
const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
// Render the component's JSX structure.
  return (
    <HydratedForm className={style.credentialsForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <TextField
          control={control}
          name="email"
          fieldParams={{ isRequired: true, label: "Email", type: "text" }}
          validate={{ validateEmail }}
          rootError={result.rootError}
        />
        <TextField
          control={control}
          name="password"
          fieldParams={{
            isRequired: true,
            label: "Password",
            type: "password",
          }}
          rootError={result.rootError}
        />
        <TextField
          control={control}
          name="confirmPassword"
          fieldParams={{
            isRequired: true,
            label: "Confirm password",
            type: "password",
          }}
          rootError={result.rootError}
        />
        {result.rootError && (
          <Box
            color="error"
            className={style.rootError}
            sx={{ color: "error.main" }}
          >
            {result.rootError || "Failed to send data"}
          </Box>
        )}
        <BaseBtn type="submit" variant="contained" fullWidth>
          Continue
        </BaseBtn>
      </Box>
      <Box className={style.signInLink}>
        Already have an account?{" "}<StyledLink href="sign-in">Log in</StyledLink>
      </Box>
    </HydratedForm>
  );
};

// Form component that captures credentials input.
export default CredentialsForm;
// Props type for the CredentialsForm component.
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<CredentialsData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
