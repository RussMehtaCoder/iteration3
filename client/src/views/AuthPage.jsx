import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

const AuthPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const switchToSignUp = () => {
    setIsSigningUp(true);
  };

  const switchToLogin = () => {
    setIsSigningUp(false);
  };

  if (isSigningUp) {
    return <SignUpForm switchToLogin={switchToLogin} />;
  } else {
    return <LoginForm switchToSignUp={switchToSignUp} />;
  }
};

export default AuthPage;
