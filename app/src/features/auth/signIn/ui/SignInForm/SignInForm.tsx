"use client";
import React from "react";
import style from "./signInForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { validateEmail } from "../../../../auth";
import { BaseBtn, StyledLink, TextField } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { Box } from "@mui/material";
import HydratedForm from "../../../ui/HydratedForm";
import { SignInData } from "../../types/form";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <HydratedForm className={style.signInForm} onSubmit={onSubmit}>
      <Box component={"h2"}>Login</Box>
      <Box className={style.fields}>
        <TextField
          control={control}
          name="email"
          fieldParams={{
            isRequired: true,
            label: "Email",
            type: "text",
            color: "secondary",
          }}
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
            color: "secondary",
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
      </Box>
      <Box className={style.signUpLink}>
        Haven't created an account before?{" "}
        <StyledLink href="sign-up">Register</StyledLink>
      </Box>
      <Box sx={{ width: "100%", mt: "20px" }}>
        <BaseBtn
          sx={{ height: "62px" }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Continue
        </BaseBtn>
      </Box>
    </HydratedForm>
  );
};

export default CredentialsForm;
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<SignInData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
