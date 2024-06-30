"use client";

import Image from "next/image";
import Link from "next/link";

import Plus from "@/app/components/symbols/Plus.svg";
import { ProgramCardProps } from "@/interfaces/interfaces";

import { HeaderProgramPage } from "@/app/components/Header";

import { getPrograms } from "@/app/api/programs-fetching/index";
import ProgramNavigator from "./ProgramNavigator";
import { useAuth } from "@/app/AuthContext";
import LoginForm from "@/app/components/LoginForm";
import Loading from "./loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useState } from "react";
import PaymentForm from "./PaymentForm";

export default async function ProgramPage({ params }: any) {
  const [accessGranted, setAccessGranted] = useState(false);

  const { user, loading } = useAuth();

  const posts: ProgramCardProps[] = await getPrograms();
  const { uri } = params;

  const post: ProgramCardProps | undefined = posts.find(
    (post) => post.uri === `/${uri}/`
  );

  if (loading) {
    return <Loading />;
  }

  if (user) {
    const userPurchaseRef = doc(db, "purchases", user.uid);
    const docSnap = await getDoc(userPurchaseRef);
    const data = docSnap.data();

    if (uri === data?.programURI) {
      return (
        <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
          <HeaderProgramPage />
          <div className="flex flex-col md:flex-row justify-between md:py-8">
            <nav className="w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]">
              <ul className="flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start">
                <li className="flex items-center gap-1 text-marine">
                  <Link href="#">Моя програма</Link>
                  <Image
                    src={Plus}
                    alt="Plus"
                    className="cursor-pointer transform w-8"
                  />
                </li>
                <li>
                  <Link href="/profile/">Профіль</Link>
                </li>
                <li>
                  <Link href="../">Головна</Link>
                </li>
              </ul>
            </nav>
            <ProgramNavigator post={post} />
          </div>
        </main>
      );
    }

    return (
      <>
        <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/payment-mobile-bg.jpg')] md:bg-[url('/sources/payment-bg.jpg')] bg-cover bg-left">
          <HeaderProgramPage />
          <div className="flex flex-col md:flex-row md:items-center justify-between py-10 h-full">
            <div className="md:mb-0 mb-10">
              <h2 className="text-2xl md:text-4xl text-left md:mb-2">
                Умови та оплата
              </h2>
              <p>Ви можете змінити наявну програму в будь-який момент</p>
            </div>
            <PaymentForm />
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
      <HeaderProgramPage />
      <div className="flex flex-col md:flex-row justify-between md:py-8">
        <nav className="w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]">
          <ul className="flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start">
            <li className="flex items-center gap-1 text-marine">
              <Link href="#">Моя програма</Link>
              <Image
                src={Plus}
                alt="Plus"
                className="cursor-pointer transform w-8"
              />
            </li>
            <li>
              <Link href="/profile/">Профіль</Link>
            </li>
            <li>
              <Link href="../">Головна</Link>
            </li>
          </ul>
        </nav>
        <LoginForm title={"Авторизуйтеся, щоб переглянути програму"} />
      </div>
    </main>
  );
}
