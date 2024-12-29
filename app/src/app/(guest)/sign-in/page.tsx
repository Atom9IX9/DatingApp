import WelcomeBlock from "@/components/SignIn/WelcomeBlock/WelcomeBlock";
import style from "../guestPages.module.scss";
import SignInForm from "@/components/SignIn/Form/SignInForm";
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
