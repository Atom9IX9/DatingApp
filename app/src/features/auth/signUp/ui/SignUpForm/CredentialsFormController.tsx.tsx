"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./credentialsForm.module.scss";
import { useEffect } from "react";
import CredentialsForm from "./CredentialsForm";
import { useRouter } from "next/navigation";
import { setUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib";
import { RtkQueryResultError } from "@/shared/types";
import { useLogin } from "../../hooks/useRegister";
import { CredentialsData } from "../../types/form";
import { Box } from "@mui/material";

const CredentialsFormController = () => {
  const { control, handleSubmit, setError, formState } =
    useForm<CredentialsData>();
  const { registerUser, ...loginResult } = useLogin();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<CredentialsData> = (data) => {
    setError("root", {message: "Test of errors"})
    console.log(data)
  };

  useEffect(() => {
    if (loginResult.error) {
      setError("root", {
        message:
          (loginResult.error as RtkQueryResultError).data?.message ||
          "Failed to send data",
      });
    }
  }, [loginResult.error, setError]);

  useEffect(() => {
    if (loginResult.data) {
      dispatch(setUser(loginResult.data.user));
      router.push("users");
    }
  }, [dispatch, loginResult.data, router]);

  return (
    <Box component="section" className={style.signUpSection}>
      <CredentialsForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: loginResult.error as RtkQueryResultError,
          status: loginResult.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </Box>
  );
};

export default CredentialsFormController;
