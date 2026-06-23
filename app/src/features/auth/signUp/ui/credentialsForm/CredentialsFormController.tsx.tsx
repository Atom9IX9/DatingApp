
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { QueryStatus } from "@reduxjs/toolkit/query";

import { RtkQueryResultError } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";

import { CredentialsData } from "../../types/form";
import { useRegisterCredentials } from "../../hooks/useRegisterCredentials";
import { RegisterCredentialsResponse } from "../../api/signUpAPI";



import CredentialsForm from "./CredentialsForm";
import style from "./credentialsForm.module.scss";

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

    try {
      const data = await registerCredentials({ email, password });
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError("root", {
        message:
          (err as RtkQueryResultError).data?.message || "Failed to send data",
      });
    }
  };

// Render the component's JSX structure.
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
// Type describing component props.
type Props = {
  onSuccess?: (data: RegisterCredentialsResponse) => void;
};
