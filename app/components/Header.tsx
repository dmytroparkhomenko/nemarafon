"use client";

import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import Navbar from "@/app/components/Navbar";
import Button from "@/app/components/Button";
import {
  Logo,
  LogoMobile,
  Burger,
  Profile,
  ProfileMobile,
  Exclamation,
  InstagramLogo,
} from "@/app/components/symbols/symbols";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = (): void =>
    setIsNavbarOpen((isNavbarOpen: boolean) => !isNavbarOpen);

  return (
    <div className="min-h-screen">
      <header className="flex flex-row w-full justify-between items-center">
        <div className={`order-1 ${isMobile ? "md:order-none" : ""}`}>
          {isMobile ? (
            <ProfileMobile />
          ) : (
            <div className="flex flex-row items-center gap-10">
              <InstagramLogo />
              <Profile />
            </div>
          )}
        </div>
        <div className={`order-2 ${isMobile ? "block" : "md:order-none"}`}>
          {isMobile ? <Logo /> : <LogoMobile />}
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
          <Button>Обрати програму</Button>
        </div>
      </div>
      <div className="w-11/12 md:w-fit md:float-right mt-28 md:mt-48 border-b border-b-marine mx-auto">
        <p className=" text-ivory mx-auto font-light text-center text-xs leading-tight pb-2">
          Комплексні програми з унікальними умовами участі та зворотним зв’язком
        </p>
      </div>
      {(isNavbarOpen || !isMobile) && <Navbar />}
    </div>
  );
}
