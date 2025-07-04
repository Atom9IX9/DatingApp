"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signUpForm.module.scss";
import { DataForLogin, useLoginMutation } from "@/api/authAPI";
import { useEffect, useState } from "react";
import { TApiError } from "@/types/types";
import SignUpForm from "./SignUpForm";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuth } from "@/lib/store/slices/authSlice/authSlice";
import { useRouter } from "next/navigation";

const SignUpFormController = () => {
  const { control, handleSubmit, setError, formState } =
    useForm<DataForLogin>();
  const [signIn, loginResult] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<DataForLogin> = (data) => {
    signIn(data);
  };

  useEffect(() => {
    if (loginResult.error) {
      setError("root", {
        message:
          (loginResult.error as TApiError).data?.message ||
          "Failed to send data",
      });
    }
  }, [loginResult.error, setError]);

  useEffect(() => {
    if (loginResult.data) {
      dispatch(setAuth({ auth: loginResult.data }));
      router.push("users");
    }
  }, [dispatch, loginResult.data, router]);

  return (
    <section className={style.signUpSection}>
      <h3 className={style.signUpPageTitle}>Sign Up</h3>

      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        result={{
          error: loginResult.error as TApiError,
          status: loginResult.status,
          rootError: formState.errors.root?.message,
        }}
      />
    </section>
  );
};

export default SignUpFormController;
