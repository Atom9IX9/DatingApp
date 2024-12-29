import Link from "next/link";

const HomePage = () => {
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
