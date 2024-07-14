"use client";

import React, { useState } from "react";

import Image from "next/image";
import GoogleIcon from "@/app/components/symbols/GoogleIcon.svg";
import EyeIcon from "@/app/components/symbols/Eye.svg";

interface LoginFormProps {
  switchToLogin: () => void;
}
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../../firebase/config";
import { signInWithGoogle } from "../../firebase/auth";

const auth = getAuth(firebaseApp);

const RegisterForm: React.FC<LoginFormProps> = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManualSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmationPassword) {
      setError("Паролі не співпадають.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
    } catch (error) {
      setError("Failed to register. Please check your input.");
      console.error("Registration error", error);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 md:mx-auto">
        <h3 className="mb-4 text-left text-ivory text-xl md:text-2xl">
          Зареєструватися
        </h3>
        <form className="pt-4 pb-8 mb-4 w-full" onSubmit={handleManualSignUp}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Імʼя
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-[0.8rem] px-[1.25rem] text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="name"
              placeholder="Ваше імʼя"
              value={name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              type={showPasswords ? "text" : "password"}
              placeholder="•••••••••••••"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-[1.9rem] mr-1"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              <Image src={EyeIcon} alt="Show password" width={20} height={20} />
            </div>
            {/* <p className="text-gray-400 text-sm mt-2">
              *пароль має містити цифри та великі літери
            </p> */}
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2" htmlFor="confirm-password">
              Повторіть пароль
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-[0.8rem] px-[1.25rem] text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type={showPasswords ? "text" : "password"}
              placeholder="•••••••••••••"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-[1.9rem] mr-1"
              onClick={() => setShowPasswords(!showPasswords)}
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
              Створити акаунт
            </button>
          </div>
          <div className="flex flex-col items-center justify-between mt-6">
            <span className="mb-2">Зареєструватись за допомогою</span>
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
              onClick={switchToLogin}
              type="button"
            >
              У мене вже є акаунт
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
