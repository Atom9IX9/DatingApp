"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./credentialsForm.module.scss";
import { useEffect } from "react";
import SignUpForm from "./CredentialsForm";
import { useRouter } from "next/navigation";
import { setUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib";
import { RtkQueryResultError } from "@/shared/types";
import { useLogin } from "../../hooks/useRegister";
import { CredentialsData } from "../../types/form";

const SignUpFormController = () => {
  const { control, handleSubmit, setError, formState } =
    useForm<CredentialsData>();
  const { registerUser, ...loginResult } = useLogin();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<CredentialsData> = (data) => {
    //registerUser(data);
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
    <section className={style.signUpSection}>
      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: loginResult.error as RtkQueryResultError,
          status: loginResult.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </section>
  );
};

export default SignUpFormController;
