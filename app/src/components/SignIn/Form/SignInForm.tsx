"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./signInForm.module.scss";
import SignInInput from "./Input/Input";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const SignInForm = ({}) => {
  const { control, handleSubmit } = useForm<Values>();

  const onSubmit: SubmitHandler<Values> = (data) => {
    console.log(data);
  };

  return (
    <section className={style.signInSection}>
      <h3>Sign In</h3>
      <form className={style.signInForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formIcon}>
          <PersonOutlineIcon sx={{ width: 50, height: 50, color: "#ffffff" }} />
        </div>
        <div className={style.fields}>
          <SignInInput
            control={control}
            name="email"
            inputProps={{ isRequired: true, label: "Email" }}
            icon={<PersonIcon sx={{width: 30, height: 30}} />}
          />
          <SignInInput
            control={control}
            name="password"
            inputProps={{ isRequired: true, label: "Password", type: "password" }}
            icon={<LockIcon sx={{width: 30, height: 30}} />}
          />
        </div>
        <Button type="submit" variant="contained" className={style.submitBtn}>submit</Button>
      </form>
    </section>
  );
};

export default SignInForm;
type Values = {
  email: string;
  password: string;
};
