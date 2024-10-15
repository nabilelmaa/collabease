import React from "react";
import LoginPage from "./forms/LoginForm";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-950">
      <div className="hidden lg:block">
        <img src="/login-illustration.svg" alt="login-illustration" />
      </div>
      <LoginPage />
    </div>
  );
};

export default Login;
