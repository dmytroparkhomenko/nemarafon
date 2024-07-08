"use client";

import React, { useState } from "react";
import Image from "next/image";
import GoogleIcon from "@/app/components/symbols/GoogleIcon.svg";
import EyeIcon from "../components/symbols/Eye.svg";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase/config";
import { signInWithGoogle } from "../firebase/auth";

const auth = getAuth(firebaseApp);

interface LoginFormProps {
  switchToRegister?: () => void | null;
  title?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister, title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManualSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.emailVerified) {
        console.log("Login successful, email verified.");
        return userCredential.user;
      } else {
        await auth.signOut();
        setError(
          `Підтвердіть вашу електрону адресу ${email}, щоб придбати програму`
        );
      }
    } catch (error) {
      setError("Помилка авторизації. Логін або пароль невірні.");
      console.error("Error signing in with email and password", error);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 md:mx-auto">
        <h3 className="mb-4 text-left text-ivory text-xl md:text-2xl">
          {title || "Увійдіть до аккаунту"}
        </h3>
        <form className="pt-4 pb-8 mb-4 w-full" onSubmit={handleManualSignIn}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Ел. пошта
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-[0.8rem] px-[1.25rem] text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="nemarafon@gmail.com"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-[0.8rem] px-[1.25rem] text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="•••••••••••••"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-[1.9rem] mr-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image src={EyeIcon} alt="Show password" width={20} height={20} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="w-full mt-4 py-[6px] md:py-[8px] bg-marine rounded-full text-center font-light text-[20px] uppercase"
            >
              АВТОРИЗУВАТИСЯ
            </button>
          </div>
          <div className="flex flex-col items-center justify-between mt-6">
            <span className="mb-2">Авторизуватись за допомогою</span>
            <button
              onClick={signInWithGoogle}
              className="py-[6px] md:py-[8px] bg-marine rounded-full text-center font-light text-[20px] uppercase flex gap-2 justify-center w-2/3"
            >
              <Image
                src={GoogleIcon}
                alt="Google icon"
                className="inline-block"
              />
              Google
            </button>
          </div>
          <div className="text-center">
            <button
              className="font-titles text-marine text-lg md:text-xl uppercase mx-auto tracking-wide mt-10"
              onClick={switchToRegister}
              type="button"
            >
              У мене ще немає аккаунту
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
