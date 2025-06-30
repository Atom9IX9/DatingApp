import WelcomeBlock from "@/components/Auth/WelcomeBlock/WelcomeBlock";
import style from "../guestPages.module.scss";
import SignInFormController from "@/components/Auth/Form/SignIn/SignInFormController";
import classNames from "classnames";

const SignIn = () => {
  return (
    <div className={classNames(style.signInPage, style.page)}>
      <div className={style.welcomeBlockContainer}>
        <WelcomeBlock />
      </div>
      <SignInFormController />
    </div>
  );
};

export default SignIn;
