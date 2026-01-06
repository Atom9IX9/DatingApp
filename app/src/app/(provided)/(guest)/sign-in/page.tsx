import style from "../guestPages.module.scss";
import { SignInForm } from "@/features";
import classNames from "classnames";

const SignIn = () => {
  return (
    <div className={classNames(style.signInPage, style.page)}>
      ... signIn
      <SignInForm />
    </div>
  );
};

export default SignIn;
