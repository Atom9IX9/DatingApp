"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Box } from "@mui/material";
import { QueryStatus } from "@reduxjs/toolkit/query";

import { RtkQueryResultError } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";
import { TransitionAlert } from "@/shared/ui";

import { UserPersonalInfoFormData } from "../../types/form";
import {
  RegisterUserPersonalInfoResponse,
  useRegisterUserPersonalInfoMutation,
} from "../../api/signUpAPI";

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

  const [registerPersonalInfo, result] = useRegisterUserPersonalInfoMutation();

  const onSubmit: SubmitHandler<UserPersonalInfoFormData> = async (data) => {
    if (!data.sex) {
      setError("sex", { message: "null_sex" });
      setAlert("Please select your sex");
    } else {
      if (data.dateOfBD) {
        try {
          const response = await registerPersonalInfo({
            dateOfBD: data.dateOfBD.toISOString(),
            firstName: data.firstName,
            gender: data.sex,
            lastName: data.lastName,
            genderInfo: data.genderInfo,
          }).unwrap();

          if (onSuccess) onSuccess(response);
        } catch (err) {
          setError("root", {
            message:
              (err as RtkQueryResultError).data?.message ||
              "Failed to send data",
          });
        }
      }
    }
  };

  // Render the component's JSX structure.
  return (
    <Box component="section" className={style.signUpSection}>
      <BackdropLoader isOpen={result.status === QueryStatus.pending} />
      <Box sx={{ position: "absolute", bottom: 0, left: 20, right: 20 }}>
        {alert && (
          <TransitionAlert alert={alert} severity="warning" isOpen={!!alert} />
        )}
      </Box>

      <PersonalInfoForm
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

export default CredentialsFormController;
// Type describing component props.
type Props = {
  onSuccess?: (data: RegisterUserPersonalInfoResponse) => void;
};
