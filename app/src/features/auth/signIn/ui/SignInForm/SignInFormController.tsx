"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signInForm.module.scss";
import { RtkQueryResultError } from "@/shared/types";
import { Box } from "@mui/material";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { BackdropLoader } from "@/shared/ui";
import { SignInData } from "../../types/form";
import SignInForm from "./SignInForm";

const CredentialsFormController: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, setError, formState } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const { registerCredentials, ...registerCredentialsResult } =
  //   useRegisterCredentials();

  const onSubmit: SubmitHandler<SignInData> = async ({ email, password }) => {
    // try {
    //   const data = await registerCredentials({ email, password });
    //   if (onSuccess) onSuccess(data);
    // } catch (err) {
    //   setError("root", {
    //     message:
    //       (err as RtkQueryResultError).data?.message || "Failed to send data",
    //   });
    // }
  };

  return (
    <Box className={style.signInSectionContainer}>
      <Box component="section" className={style.signInSection}>
        <BackdropLoader
          isOpen={false} //registerCredentialsResult.status === QueryStatus.pending}
        />
        <SignInForm
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          result={{
            error: undefined, //registerCredentialsResult.error as RtkQueryResultError,
            status: QueryStatus.fulfilled, //registerCredentialsResult.status,
            rootError: formState.errors.root?.message,
          }}
        />
      </Box>
    </Box>
  );
};

export default CredentialsFormController;
type Props = {
  onSuccess?: (data: any) => void; // todo
};
