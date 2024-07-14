import React from "react";

import LoginForm from "@/app/components/authentication/LoginForm";
import RegisterForm from "@/app/components/authentication/RegisterForm";

import { useAuth } from "../../AuthContext";
import Button from "../common/Button";

interface AuthLayerProps {
  isLogin: boolean;
  setIsLogin: (arg0: boolean) => void;
  loginTitle?: string;
}

const handleRefresh = () => {
  window.location.reload();
};

export default function AuthLayer({
  isLogin,
  setIsLogin,
  loginTitle,
}: AuthLayerProps) {
  const { user, loading } = useAuth();

  if (!loading && user && !user.emailVerified) {
    return (
      <div>
        <h2 className="text-lg md:text-xl text-white text-left mb-2">
          Ми відправили вам на {user.email} лист для підтвердження реєстрації
          акаунту.
        </h2>
        <Button onClick={handleRefresh}>Підтвердив(-ла)</Button>
      </div>
    );
  }

  return (
    <>
      {isLogin ? (
        <LoginForm
          title={loginTitle}
          switchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm switchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
}
