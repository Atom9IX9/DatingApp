import React from "react";
import style from "./credentialsForm.module.scss";
import { Control } from "react-hook-form";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { validateEmail } from "../../../../auth";
import { UIInputField, StyledLink } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import SubmitBtn from "../SubmitBtn";
import { Box } from "@mui/material";
import HydratedForm from "../HydratedRegisterProcessForm";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <HydratedForm className={style.credentialsForm} onSubmit={onSubmit}>
      <Box className={style.fields}>
        <UIInputField
          control={control}
          name="email"
          inputParams={{ isRequired: true, label: "Email" }}
          validate={{ validateEmail }}
          rootError={result.rootError}
        />
        <UIInputField
          control={control}
          name="password"
          inputParams={{
            isRequired: true,
            label: "Password",
            type: "password",
          }}
          rootError={result.rootError}
        />
        <UIInputField
          control={control}
          name="confirmPassword"
          inputParams={{
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
        <SubmitBtn />
      </Box>
      <Box className={style.signInLink}>
        Already have an account? <StyledLink href="sign-in">Log in</StyledLink>
      </Box>
    </HydratedForm>
  );
};

export default CredentialsForm;
type CredentialsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: Control<CredentialsData>;
  result: {
    error?: RtkQueryResultError;
    status: QueryStatus;
    rootError?: string;
  };
};
