"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./credentialsForm.module.scss";
import { useEffect } from "react";
import CredentialsForm from "./CredentialsForm";
import { RtkQueryResultError } from "@/shared/types";
import { CredentialsData } from "../../types/form";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useRegisterCredentials } from "../../hooks/useRegisterCredentials";
import { RegisterCredentialsResponse } from "../../api/signUpAPI";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { BackdropLoader } from "@/shared/ui";

const CredentialsFormController: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, setError, formState } =
    useForm<CredentialsData>({
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

  const { registerCredentials, ...registerCredentialsResult } =
    useRegisterCredentials();

  const onSubmit: SubmitHandler<CredentialsData> = async ({
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });

      return;
    }

    registerCredentials({ email, password });
  };

  useEffect(() => {
    if (registerCredentialsResult.error) {
      setError("root", {
        message:
          (registerCredentialsResult.error as RtkQueryResultError).data
            ?.message || "Failed to send data",
      });
    }
  }, [registerCredentialsResult.error, setError]);

  useEffect(() => {
    if (registerCredentialsResult.data) {
      if (onSuccess) {
        onSuccess(registerCredentialsResult.data);
      }
    }
  }, [registerCredentialsResult.data, onSuccess]);

  return (
    <Box component="section" className={style.signUpSection}>
      <BackdropLoader
        isOpen={registerCredentialsResult.status === QueryStatus.pending}
      />
      <CredentialsForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: registerCredentialsResult.error as RtkQueryResultError,
          status: registerCredentialsResult.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </Box>
  );
};

export default CredentialsFormController;
type Props = {
  onSuccess?: (data: RegisterCredentialsResponse) => void;
};
