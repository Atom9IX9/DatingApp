import { AuthUser } from "@/models/user.model";
import Link from "next/link";

const HomePage: React.FC<Props> = ({ auth }) => {
  return (
    <div>
      start unauth page 
      <div>
        <Link href="sign-in">Sign in</Link>
      </div>
      <div>
        <Link href="sign-up">Sign up</Link>
      </div>
    </div>
  );
};

export default HomePage;
type Props = {
  auth: AuthUser
}
