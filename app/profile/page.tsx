"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Session, SessionUser } from "@/interfaces/interfaces";

import Plus from "@/app/components/symbols/Plus.svg";

import { HeaderProgramPage } from "@/app/components/Header";
// import { useSession } from "next-auth/react";

import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../AuthContext";

export default function Profile() {
  // const { data: session } = useSession() as { data: Session };

  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
      <HeaderProgramPage />
      <div className="flex flex-col items-stretch md:flex-row justify-between md:my-6 h-[-webkit-fill-available]">
        <nav
          className={`w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]`}
        >
          <ul
            className={`flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start`}
          >
            <li>
              <Link href="#">Моя програма</Link>
            </li>
            <li className="flex items-center gap-1 text-marine">
              <Link href="/profile/">Профіль</Link>
              <Image
                src={Plus}
                alt="Plus"
                className="cursor-pointer transform w-8"
              />
            </li>
            <li>
              <Link href="../">Головна</Link>
            </li>
          </ul>
        </nav>

        {/* {session ? (
          <UserProfile session={session} />
        ) : (
          <>
            {isLogin ? (
              <LoginForm switchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm switchToLogin={() => setIsLogin(true)} />
            )}
          </>
        )} */}
        {user ? (
          <UserProfile user={user} />
        ) : (
          <>
            {isLogin ? (
              <LoginForm switchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm switchToLogin={() => setIsLogin(true)} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
