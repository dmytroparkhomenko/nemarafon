"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import GoogleIcon from "@/app/components/symbols/GoogleIcon.svg";

import Button from "../components/Button";
import EyeIcon from "../components/symbols/Eye.svg";

// import { signIn } from "next-auth/react";

interface LoginFormProps {
  switchToLogin: () => void;
}
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from "../firebase/config";
import { signInWithGoogle } from "../firebase/auth";

const auth = getAuth(firebaseApp);

const RegisterForm: React.FC<LoginFormProps> = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // rewrite
  };

  const handleManualSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Once the user is created, update their profile with the displayName
        return updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
          // After successful profile update, continue
          console.log(
            "User registered with display name:",
            userCredential.user.displayName
          );
          return userCredential.user;
        });
      })
      .catch((error) => {
        // Handle any errors from either createUserWithEmailAndPassword or updateProfile
        setError("Failed to sign up. Please check your credentials.");
        console.error("Error registering with email and password", error);
      });
  };

  // duplicate
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 md:mx-auto">
        <h3 className="mb-4 text-left text-ivory text-xl md:text-2xl">
          Зареєструватися
        </h3>
        <form className="pt-6 pb-8 mb-4 w-full" onSubmit={handleManualSignUp}>
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
              type={showPassword ? "text" : "password"}
              placeholder="•••••••••••••"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-[1.9rem] mr-1"
              onClick={handleTogglePassword}
            >
              <Image src={EyeIcon} alt="Show password" width={20} height={20} />
            </div>
            {/* <p className="text-gray-400 text-sm mt-2">
              *пароль має містити цифри та великі літери
            </p> */}
          </div>
          {/* <div className="mb-4 relative">
            <label className="block mb-2" htmlFor="confirm-password">
              Повторіть пароль
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-[0.8rem] px-[1.25rem] text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="•••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-[1.9rem] mr-1"
              onClick={handleTogglePassword}
            >
              <Image src={EyeIcon} alt="Show password" width={20} height={20} />
            </div>
          </div> */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="w-full mt-4 py-[6px] md:py-[8px] bg-marine rounded-full text-center font-light text-[20px] uppercase"
            >
              Створити аккаунт
            </button>
          </div>
          <div className="flex flex-col items-center justify-between mt-6">
            <span className="mb-2">Зареєструватись за допомогою</span>
            <button
              onSubmit={handleGoogleSignIn}
              type="submit"
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
              У мене вже є аккаунт
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
