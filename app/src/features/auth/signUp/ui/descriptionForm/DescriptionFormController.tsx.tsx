"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./descriptionForm.module.scss";
import { useEffect } from "react";
import DescriptionForm from "./DescriptionForm";
import { RtkQueryResultError } from "@/shared/types";
import { Backdrop, Box, Chip, CircularProgress } from "@mui/material";
import { useRegisterCredentials } from "../../hooks/useRegisterCredentials";
import { RegisterCredentialsResponse, RegisterUserDescriptionReqBody } from "../../api/signUpAPI";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { BackdropLoader } from "@/shared/ui";

const DescriptionFormController: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, setError, formState } =
    useForm<RegisterUserDescriptionReqBody>({
      defaultValues: {
        description: "",
        hobbies: []
      },
    });

  const { registerCredentials, ...registerCredentialsResult } =
    useRegisterCredentials();

  const onSubmit: SubmitHandler<RegisterUserDescriptionReqBody> = async ({
    description, hobbies
  }) => {
    try {
      //const data = await ...
      //if (onSuccess) onSuccess(data);
    } catch (err) {
      setError("root", {
        message:
          (err as RtkQueryResultError).data?.message || "Failed to send data",
      });
    }
  };

  return (
    <Box component="section" className={style.signUpSection}>
      <BackdropLoader
        isOpen={registerCredentialsResult.status === QueryStatus.pending}
      />
      <Chip label="Deletable" color="primary" onDelete={() => {}} />
      <DescriptionForm
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

export default DescriptionFormController;
type Props = {
  onSuccess?: (data: RegisterCredentialsResponse) => void;
};
