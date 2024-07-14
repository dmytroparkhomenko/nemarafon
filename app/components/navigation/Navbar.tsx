import React from "react";
import Link from "next/link";

interface NavbarProps {
  navStyles: string;
  ulStyles: string;
}

export default function Navbar({ navStyles, ulStyles }: NavbarProps) {
  return (
    <nav
      className={`${navStyles} flex flex-col px-[48px] md:p-0 py-[20px] left-0 md:left-[5%] right-0 mx-auto md:mx-0 ease-linear font-titles font-light rounded-[20px] z-0`}
    >
      <ul className={`flex ${ulStyles}`}>
        <li>
          <Link href="#about-me">ПРО МЕНЕ</Link>
        </li>
        <li>
          <Link href="/program">ПРОГРАМИ</Link>
        </li>
        <li>
          <Link href="/program/">НЕМАРАФОН 2024</Link>
        </li>
        <li>
          <Link href="#reviews">ВІДГУКИ</Link>
        </li>
        <li>
          <Link href="/profile">ПРОФІЛЬ</Link>
        </li>
      </ul>
    </nav>
  );
}
