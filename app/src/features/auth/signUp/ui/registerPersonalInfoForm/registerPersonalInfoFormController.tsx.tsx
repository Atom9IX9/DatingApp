"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Box } from "@mui/material";

import { BackdropLoader } from "@/shared/ui";
import { TransitionAlert } from "@/shared/ui";

import { UserPersonalInfoFormData } from "../../types/form";
import {
  registerPersonalInfoAction,
  RegisterUserPersonalInfoResponse,
} from "../../api/registerPersonalInfoAction";

import PersonalInfoForm from "./registerPersonalInfoForm";
import style from "./registerPersonalInfoForm.module.scss";

const CredentialsFormController: React.FC<Props> = ({ onSuccess }) => {
  const [alert, setAlert] = useState<null | string>(null);

  const { control, handleSubmit, setError, formState } =
    useForm<UserPersonalInfoFormData>({
      defaultValues: {
        firstName: "",
        lastName: "",
        dateOfBD: null,
        genderInfo: undefined,
        sex: undefined,
      },
    });

  const onSubmit: SubmitHandler<UserPersonalInfoFormData> = async (data) => {
    if (!data.sex) {
      setError("sex", { message: "null_sex" });
      setAlert("Please select your sex");
    } else {
      if (data.dateOfBD) {
        const res = await registerPersonalInfoAction({
          dateOfBD: data.dateOfBD.toISOString(),
          firstName: data.firstName,
          gender: data.sex,
          lastName: data.lastName,
          genderInfo: data.genderInfo,
        });

        if (res.data && res.success) {
          if (onSuccess) onSuccess(res.data);
        } else {
          setError("root", {
            message: res.errorMessage || "Failed to send data",
          });
        }
      }
    }
  };

  // Render the component's JSX structure.
  return (
    <Box component="section" className={style.signUpSection}>
      <BackdropLoader isOpen={formState.isSubmitting} />
      <Box sx={{ position: "absolute", bottom: 0, left: 20, right: 20 }}>
        {alert && (
          <TransitionAlert alert={alert} severity="warning" isOpen={!!alert} />
        )}
      </Box>

      <PersonalInfoForm
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
  onSuccess?: (data: RegisterUserPersonalInfoResponse) => void;
};
