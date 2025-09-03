import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const AuthPage = () => {
  const [login, setlogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {login ? (
        <LoginForm state={setlogin} />
      ) : (
        <RegisterForm state={setlogin} />
      )}
    </div>
  );
};

export default AuthPage;
