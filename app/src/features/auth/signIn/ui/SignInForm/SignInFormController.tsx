"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signInForm.module.scss";
import { useEffect } from "react";
import SignInForm from "./SignInForm";
import { useRouter } from "next/navigation";
import { DataForLogin } from "../../api/signInAPI";
import { useLogin } from "../../hooks/useLogin";
import { setUser } from "@/entities";
import { RtkQueryResultError } from "@/shared/types";
import { useAppDispatch } from "@/shared/lib";

const SignInFormController = () => {
  const { control, handleSubmit, setError, formState } = useForm<DataForLogin>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const {login, ...loginResult} = useLogin();
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
    } else if (loginResult.data) {
      dispatch(setUser(loginResult.data.user));
    }
  }, [loginResult.error, setError, loginResult.data, dispatch]);

  useEffect(() => {
    if (loginResult.data) {
      dispatch(setUser(loginResult.data.user));
      router.push("users");
    }
  }, [dispatch, loginResult.data, router]);

  return (
    <section className={style.signInSection}>
      <h3 className={style.signInPageTitle}>Sign In</h3>
      <p className={style.signInPageText}>
        Enter your details to sign in your account
      </p>
      <SignInForm
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

export default SignInFormController;
