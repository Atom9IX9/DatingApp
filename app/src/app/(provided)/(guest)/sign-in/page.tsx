import WelcomeBlock from "@/components/Auth/WelcomeBlock/WelcomeBlock";
import style from "../guestPages.module.scss";
import { SignInForm } from "@/features";
import classNames from "classnames";

const SignIn = () => {
  return (
    <div className={classNames(style.signInPage, style.page)}>
      <div className={style.welcomeBlockContainer}>
        <WelcomeBlock />
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
