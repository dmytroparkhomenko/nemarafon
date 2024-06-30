"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Plus from "@/app/components/symbols/Plus.svg";

import { HeaderProgramPage } from "@/app/components/Header";

import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../AuthContext";

import { addWeeks, format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Profile() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [program, setProgram] = useState({
    title: "Loading program name...",
    description: "Loading program details...",
    purchaseDate: "",
    expires: "",
    uri: "",
  });

  useEffect(() => {
    if (user) {
      const fetchProgramData = async () => {
        const userPurchaseRef = doc(db, "purchases", user.uid);
        const docSnap = await getDoc(userPurchaseRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const purchaseDate = data.purchaseDate.toDate();
          const expirationDate = addWeeks(purchaseDate, 4);

          setProgram({
            title: data.title || "Program doesn't have a name",
            description: "Details about your program will be displayed here.",
            purchaseDate: format(purchaseDate, "PPP"),
            expires: format(expirationDate, "PPP"),
            uri: data.programURI,
          });
        } else {
          setProgram({
            title: "No program purchased",
            description: "Details about your program will be displayed here.",
            purchaseDate: "",
            expires: "",
            uri: "",
          });
        }
      };

      fetchProgramData();
    }
  }, [user]);

  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
      <HeaderProgramPage />
      <div className="flex flex-col items-stretch md:flex-row justify-between md:my-8 h-[-webkit-fill-available]">
        <nav className="w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]">
          <ul className="flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start">
            <li>
              <Link href={`program/${program.uri}`}>Моя програма</Link>
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

        {!loading && user ? (
          <UserProfile user={user} program={program} />
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
