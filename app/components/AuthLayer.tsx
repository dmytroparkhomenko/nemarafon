"use client";

import React, { useState } from "react";

import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";

export default function AuthLayer({ isLogin, setIsLogin, loginTitle }: any) {
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
