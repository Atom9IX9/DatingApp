"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";

import { BackdropLoader } from "@/shared/ui";

import { CredentialsData } from "../../types/form";
import {
  registerCredentialsAction,
  RegisterCredentialsResponse,
} from "../../api/registerCredentialsAction";

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

    const res = await registerCredentialsAction({ email, password });
    if (res.data && res.success) {
      if (onSuccess) onSuccess(res.data);
    } else {
      setError("root", {
        message: res.errorMessage || "Failed to send data",
      });
    }
  };

  // Render the component's JSX structure.
  return (
    <Box component="section" className={style.signUpSection}>
      <BackdropLoader isOpen={formState.isSubmitting} />
      <CredentialsForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
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
