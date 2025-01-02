"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signInForm.module.scss";
import SignInFieldController from "./Field/FieldController.tsx";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { validateEmail } from "@/utils/validation/singInValidation";
import { useLoginMutation } from "@/api/authAPI";
import { useEffect } from "react";
import { TApiError } from "@/types/types";
import { QueryStatus } from "@reduxjs/toolkit/query";

const SignInForm = ({}) => {
  const { control, handleSubmit, setError, formState } = useForm<Values>();
  const [signIn, loginResult] = useLoginMutation();

  const onSubmit: SubmitHandler<Values> = (data) => {
    signIn(data);
  };

  useEffect(() => {
    console.log(loginResult.error)
    if (loginResult.error) {
      setError("root", {
        message: (loginResult.error as TApiError).data?.message || "Failed to send data",
      });
    }
  }, [loginResult.error, setError]);

  return (
    <section className={style.signInSection}>
      <h3 className={style.signInPageTitle}>Sign In</h3>
      <p className={style.signInPageText}>
        Enter your details to sign in your account
      </p>
      <form className={style.signInForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formIcon}>
          <PersonOutlineIcon sx={{ width: 50, height: 50, color: "#ffffff" }} />
        </div>
        <div className={style.fields}>
          <SignInFieldController
            control={control}
            name="email"
            inputParams={{ isRequired: true, label: "Email" }}
            icon={<PersonIcon sx={{ width: 30, height: 30 }} />}
            validate={{ validateEmail }}
            errors={formState.errors}
          />
          <SignInFieldController
            control={control}
            name="password"
            inputParams={{
              isRequired: true,
              label: "Password",
              type: "password",
            }}
            icon={<LockIcon sx={{ width: 30, height: 30 }} />}
            errors={formState.errors}
          />
          {!!loginResult.error && (
            <div className={style.rootError}>
              {(loginResult.error as TApiError).data?.message || "Failed to send data"}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          className={style.submitBtn}
          disabled={loginResult.status === QueryStatus.pending}
        >
          submit
        </Button>
      </form>
    </section>
  );
};

export default SignInForm;
type Values = {
  email: string;
  password: string;
};
