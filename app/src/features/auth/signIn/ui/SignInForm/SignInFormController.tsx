"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";

import { BackdropLoader } from "@/shared/ui";

import { SignInData } from "../../types/form";
import { LoginResponse } from "../../api/signInAPI";
import { loginAction } from "../../api/signInAction";

import SignInForm from "./SignInForm";
import style from "./signInForm.module.scss";

const CredentialsFormController: React.FC<Props> = () => {
  const { control, handleSubmit, setError, formState } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInData> = async ({ email, password }) => {
    const res = await loginAction(email, password);
    if (res.message) {
      setError("root", {
        message: res.message || "Failed to send data",
      });
    }
  };

  // Render the component's JSX structure.
  return (
    <Box className={style.signInSectionContainer}>
      <Box component="section" className={style.signInSection}>
        <BackdropLoader isOpen={formState.isSubmitting} />
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          result={{
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
