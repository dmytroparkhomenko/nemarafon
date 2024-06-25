import Image from "next/image";
import { Logo, LogoMobile } from "./symbols/symbols";
import Navbar from "@/app/components/Navbar";

import Visa from "./symbols/Visa.svg";
import Mastercard from "./symbols/Mastercard.svg";

export default function Footer() {
  return (
    <footer className="w-full px-5 md:px-24 py-12 md:py-16 bg-cover bg-right z-0 bg-[url('/sources/footer-bg.jpg')]">
      <div className="hidden md:block mx-auto">
        <Logo isCentered={true} />
      </div>
      <div className="md:hidden">
        <LogoMobile isCentered={true} />
      </div>
      <Navbar navStyles="my-20" ulStyles={"justify-center gap-20"} />
      <div className="flex flex-col text-center md:mb-10">
        <div className="flex justify-center gap-6 text-marine uppercase text-lg font-light">
          <a className="" href="#">
            INSTAGRAM
          </a>
          <a className="" href="#">
            TELEGRAM
          </a>
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <p className="text-gray-500 uppercase text-base ">© 2024 НЕмарафон</p>
        <div className="flex items-center gap-4">
          <Image
            src={Visa}
            alt="visa"
            className="w-[30px] md:w-[40px] h-auto"
          />
          <Image
            src={Mastercard}
            alt="visa"
            className="w-[30px] md:w-[40px] h-auto"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 text-gray-500 mt-6">
        <a href="#">Договiр публiчної оферти </a>
        <a href="#">Політика використання файлів cookie умови користування</a>
        <a href="#">Політика конфіденційності </a>
      </div>
    </footer>
  );
}
