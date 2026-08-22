"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";

import { BackdropLoader } from "@/shared/ui";

import {
  registerUserDescriptionAction,
  RegisterUserDescriptionReqBody,
  RegisterUserDescriptionResponse,
} from "../../api/registerUserDescriptionAction";

import DescriptionForm from "./DescriptionForm";
import style from "./descriptionForm.module.scss";

const DescriptionFormController: React.FC<Props> = ({ onSuccess }) => {
  const { control, handleSubmit, setError, formState } =
    useForm<RegisterUserDescriptionReqBody>({
      defaultValues: {
        description: "",
        hobbies: [],
      },
    });

  const onSubmit: SubmitHandler<RegisterUserDescriptionReqBody> = async ({
    description,
    hobbies,
  }) => {
    const res = await registerUserDescriptionAction({ description, hobbies });

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
      <DescriptionForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
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
