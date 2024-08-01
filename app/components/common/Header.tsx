"use client";

import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import Navbar from "@/app/components/navigation/Navbar";
import Button from "./Button";
import {
  Logo,
  LogoMobile,
  Burger,
  Profile,
  ProfileMobile,
  Exclamation,
  InstagramLogo,
} from "@/app/components/symbols/symbols";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";

const Langs = () => {
  return (
    <div className="langs flex gap-5">
      <Link
        href="#"
        className="lang py-1 px-6 rounded-full border-[1px] border-transparent bg-marine font-light"
      >
        UA
      </Link>
      <Link
        href="#"
        className="lang py-1 px-6 rounded-full border-[1px] border-ivory font-light"
      >
        EN
      </Link>
    </div>
  );
};

export default function Header() {
  const { user, loading } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = (): void =>
    setIsNavbarOpen((isNavbarOpen: boolean) => !isNavbarOpen);

  return (
    <>
      {(isNavbarOpen || !isMobile) && (
        <Navbar
          navStyles="absolute top-[85px] md:top-[50vh] md:translate-y-[-50%] w-[90%] md:w-fit bg-marine md:bg-transparent"
          ulStyles={"flex-col gap-6"}
        />
      )}
      <header className="flex flex-row w-full justify-between items-center">
        <div className={`order-1 ${isMobile ? "md:order-none" : ""}`}>
          {isMobile ? (
            <ProfileMobile />
          ) : (
            <div className="flex flex-row items-center gap-10">
              <InstagramLogo />
              <Langs />
              <Link href="/profile" className="flex items-center gap-3">
                <Profile />
                {!loading ? (
                  <span className="uppercase">{user?.displayName}</span>
                ) : null}
              </Link>
            </div>
          )}
        </div>
        <div className={`order-2 ${isMobile ? "block" : "md:order-none"}`}>
          {isMobile ? (
            <LogoMobile isCentered={false} />
          ) : (
            <Logo isCentered={false} />
          )}
        </div>
        <div className={`order-3 ${isMobile ? "block" : "md:hidden block"}`}>
          <Burger onClick={toggleNavbar} burgerState={isNavbarOpen} />
        </div>
      </header>
      <div className="w-full md:w-2/5 mt-24 m-auto">
        <div className="flex flex-row items-center gap-5 md:gap-0 md:justify-center">
          <Exclamation />
          <h1 className="w-8/12 md:w-full text-2xl md:text-4xl text-left md:text-center leading-tight md:leading-[3rem] font-titles font-bold uppercase">
            Науковий підхід до створення тіла
          </h1>
          {isMobile ? null : <Exclamation />}
        </div>
        <p className="block font-light text-center mt-8 text-sm md:text-lg leading-tight">
          Для мене є надзвичайно важливим комплексний підхід до тіла – я працюю
          з причиною, а не з симптомами
        </p>
        <div className="flex justify-center button">
          <Button className="mt-9 md:w-2/3" href="/program">
            Обрати програму
          </Button>
        </div>
      </div>
      <div className="w-3/4 md:w-fit md:float-right mt-28 md:mt-48 border-b border-b-marine mx-auto">
        <p className="text-ivory mx-auto font-light text-center text-xs leading-tight pb-2">
          Комплексні програми з унікальними умовами участі та зворотним зв’язком
        </p>
      </div>
    </>
  );
}

export function HeaderProgramPage() {
  const { user, loading } = useAuth();

  return (
    <>
      <header className="flex flex-row w-full justify-between items-center">
        <div className="logo">
          <div className="block md:hidden">
            <LogoMobile isCentered={false} />
          </div>
          <div className="hidden md:block">
            <Logo isCentered={false} />
          </div>
        </div>
        <div className="header-navbar">
          <Link href="/profile" className="flex items-center gap-3 md:hidden">
            <ProfileMobile />
            {!loading && user ? <span>{user.displayName}</span> : null}
          </Link>
          <div className="hidden md:flex flex-row items-center gap-10">
            <InstagramLogo />
            <Langs />
            <Link href="/profile" className="flex items-center gap-3">
              <Profile />
              {!loading ? <span>{user?.displayName}</span> : null}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
