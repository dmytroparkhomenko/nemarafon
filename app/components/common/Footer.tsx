import Image from "next/image";
import { Logo, LogoMobile } from "@/app/components/symbols/symbols";
import Navbar from "@/app/components/navigation/Navbar";

import Visa from "@/app/components/symbols/Visa.svg";
import Mastercard from "@/app/components/symbols/Mastercard.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full px-5 md:px-24 py-12 md:py-16 bg-cover bg-right z-0 bg-[url('/sources/footer-bg.jpg')] rounded-3xl"
    >
      <div className="hidden md:block mx-auto">
        <Logo isCentered={true} />
      </div>
      <div className="md:hidden">
        <LogoMobile isCentered={true} />
      </div>
      <Navbar
        navStyles="my-8 md:my-20"
        ulStyles={
          "justify-center gap-8 md:gap-20 flex-col md:flex-row items-center md:items-start"
        }
      />
      <div className="flex flex-col text-center md:mb-10">
        <div className="flex justify-center gap-6 text-marine uppercase text-lg font-light">
          <a href="https://www.instagram.com/butenkoanastasia/">INSTAGRAM</a>
          <a href="https://t.me/nemarafon_Butenko">TELEGRAM</a>
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <div>
          <p className="text-gray-500 uppercase text-base ">© 2024 НЕмарафон</p>
          <p className="text-gray-500 uppercase text-base mt-2">
            ФОП "Бутенко Анастасія Миколаївна"
          </p>
        </div>
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
        <Link href="/terms">Договiр публiчної оферти </Link>
        <a href="#">Політика використання файлів cookie умови користування</a>
        <a href="#">Політика конфіденційності </a>
      </div>
    </footer>
  );
}
