import Link from "next/link";

const HomePage: React.FC = () => {
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

