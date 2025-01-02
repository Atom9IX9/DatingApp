import WelcomeBlock from "@/components/SignIn/WelcomeBlock/WelcomeBlock";
import style from "../guestPages.module.scss";
import SignInFormController from "@/components/SignIn/Form/SignInFormController";
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
