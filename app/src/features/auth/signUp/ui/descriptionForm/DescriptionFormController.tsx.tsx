
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./descriptionForm.module.scss";
import DescriptionForm from "./DescriptionForm";
import { RtkQueryResultError } from "@/shared/types";
import { Box, Chip } from "@mui/material";
import { RegisterUserDescriptionReqBody, RegisterUserDescriptionResponse, useRegisterUserDescriptionMutation } from "../../api/signUpAPI";
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

  const [registerDescription, result] =
    useRegisterUserDescriptionMutation();

  const onSubmit: SubmitHandler<RegisterUserDescriptionReqBody> = async ({
    description, hobbies
  }) => {
    try {
      const data = await registerDescription({ description, hobbies }).unwrap();
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
        isOpen={result.status === QueryStatus.pending}
      />
      <DescriptionForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: result.error as RtkQueryResultError,
          status: result.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </Box>
  );
};

export default DescriptionFormController;
// Type describing component props.
type Props = {
  onSuccess?: (data: RegisterUserDescriptionResponse) => void;
};
