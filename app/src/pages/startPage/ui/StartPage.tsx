import Link from "next/link";
import style from "./startPage.module.scss"

const StartPage: React.FC = async () => {
  return (
    <div className={style.container}>
      Welocme!!
      <div>
        <Link href="sign-in">Sign in</Link>
      </div>
      <div>
        <Link href="sign-up">Sign up</Link>
      </div>
    </div>
  );
};

export default StartPage;