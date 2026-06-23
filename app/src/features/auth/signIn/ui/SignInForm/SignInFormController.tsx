
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { QueryStatus } from "@reduxjs/toolkit/query";

import { RtkQueryResultError } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";

import { SignInData } from "../../types/form";
import { LoginResponse } from "../../api/signInAPI";
import { useLogin } from "../../hooks/useLogin";

import SignInForm from "./SignInForm";
import style from "./signInForm.module.scss";

const CredentialsFormController: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, setError, formState } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, result } = useLogin();

  const onSubmit: SubmitHandler<SignInData> = async ({ email, password }) => {
    try {
      const data = await login({ email, password });
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
    <Box className={style.signInSectionContainer}>
      <Box component="section" className={style.signInSection}>
        <BackdropLoader isOpen={result.status === QueryStatus.pending} />
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          result={{
            error: result.error as RtkQueryResultError,
            status: result.status,
            rootError: formState.errors.root?.message,
          }}
        />
      </Box>
    </Box>
  );
};

export default CredentialsFormController;
// Type describing component props.
type Props = {
  onSuccess?: (data: LoginResponse) => void;
};
