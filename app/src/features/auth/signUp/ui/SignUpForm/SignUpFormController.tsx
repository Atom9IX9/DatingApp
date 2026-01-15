"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signUpForm.module.scss";
import { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import { useRouter } from "next/navigation";
import { useLogin, DataForLogin } from "@/features";
import { setUser } from "@/entities";
import { useAppDispatch } from "@/shared/lib";
import { RtkQueryResultError } from "@/shared/types";

const SignUpFormController = () => {
  const { control, handleSubmit, setError, formState } =
    useForm<DataForLogin>();
  const { login, ...loginResult } = useLogin();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<DataForLogin> = (data) => {
    login(data);
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
      <h3 className={style.signUpPageTitle}>Sign Up</h3>

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
