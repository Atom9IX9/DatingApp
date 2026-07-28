"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { BackdropLoader } from "@/shared/ui";

import { SignInData } from "../../types/form";
import { loginAction } from "../../api/signInAction";

import SignInForm from "./SignInForm";
import style from "./signInForm.module.scss";

const CredentialsFormController: React.FC = () => {
  const { control, handleSubmit, setError, formState } = useForm<SignInData>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<SignInData> = async ({ email, password }) => {
    const res = await loginAction({ email, password });
    if (!res.success) {
      setError("root", {
        message: res.message || "Failed to send data",
      });
    } else {
      push("/home");
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
