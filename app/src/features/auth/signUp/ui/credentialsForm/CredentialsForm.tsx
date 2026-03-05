import React from "react";
import style from "./credentialsForm.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import { Control, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { DataForLogin, validateEmail } from "../../../../auth";
import { UIIconInputField, StyledLink } from "@/shared/ui";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import SubmitBtn from "./SubmitBtn";
import { Box } from "@mui/material";

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  control,
  result,
}) => {
  return (
    <Box
      component="form"
      className={style.credentialsForm}
      onSubmit={onSubmit}
      action="#"
      noValidate
    >
      <Box className={style.fields}>
        <UIIconInputField
          control={control}
          name="email"
          inputParams={{ isRequired: true, label: "Email" }}
          icon={<PersonIcon sx={{ width: 30, height: 30 }} />}
          validate={{ validateEmail }}
          rootError={result.rootError}
        />
        <UIIconInputField
          control={control}
          name="password"
          inputParams={{
            isRequired: true,
            label: "Password",
            type: "password",
          }}
          icon={<LockIcon sx={{ width: 30, height: 30 }} />}
          rootError={result.rootError}
        />
        <UIIconInputField
          control={control}
          name="confirmPassword"
          inputParams={{
            isRequired: true,
            label: "Confirm password",
            type: "password",
          }}
          icon={<LockIcon sx={{ width: 30, height: 30 }} />}
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
    </Box>
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
