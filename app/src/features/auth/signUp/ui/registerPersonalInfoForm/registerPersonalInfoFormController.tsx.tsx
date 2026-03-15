"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./registerPersonalInfoForm.module.scss";
import { useEffect, useState } from "react";
import PersonalInfoForm from "./registerPersonalInfoForm";
import { RtkQueryResultError } from "@/shared/types";
import { UserPersonalInfoFormData } from "../../types/form";
import { Alert, Backdrop, Box, CircularProgress } from "@mui/material";
import { useRegisterCredentials } from "../../hooks/useRegisterCredentials";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { BackdropLoader } from "@/shared/ui";
import TransitionAlerts from "@/shared/ui/TransitionAlert";

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

  //todo: reusable hook/hoc after backend; backend
  // const { registerCredentials, ...registerCredentialsResult } =
  //   useRegisterCredentials();

  const onSubmit: SubmitHandler<UserPersonalInfoFormData> = async (data) => {
    if (!data.sex) {
      setError("sex", { message: "null_sex" });
      setAlert("Please select your sex");
    } else {
      console.log(data); // do next
    }
  };

  // useEffect(() => {
  //   if (registerCredentialsResult.error) {
  //     setError("root", {
  //       message:
  //         (registerCredentialsResult.error as RtkQueryResultError).data
  //           ?.message || "Failed to send data",
  //     });
  //   }
  // }, [registerCredentialsResult.error, setError]);

  // useEffect(() => {
  //   if (registerCredentialsResult.data) {
  //     if (onSuccess) {
  //       onSuccess(registerCredentialsResult.data);
  //     }
  //   }
  // }, [registerCredentialsResult.data, onSuccess]);

  return (
    <Box component="section" className={style.signUpSection}>
      {/* <BackdropLoader
        isOpen={registerCredentialsResult.status === QueryStatus.pending}
      /> */}
      <Box sx={{ position: "absolute", bottom: 0, left: 20, right: 20 }}>{alert && <TransitionAlerts alert={alert} severity="warning" isOpen={!!alert} />}</Box>
      
      <PersonalInfoForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: undefined, //registerCredentialsResult.error as RtkQueryResultError,
          status: QueryStatus.uninitialized, //registerCredentialsResult.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </Box>
  );
};

export default CredentialsFormController;
type Props = {
  onSuccess?: (data: any) => void;
};
