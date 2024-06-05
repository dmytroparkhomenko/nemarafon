import React from "react";

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
          <a href="#">ПРО МЕНЕ</a>
        </li>
        <li>
          <a href="#">ПРОГРАМИ</a>
        </li>
        <li>
          <a href="#">НЕМАРАФОН 2024</a>
        </li>
        <li>
          <a href="#">ВІДГУКИ</a>
        </li>
        <li>
          <a href="#">КОНТАКТИ</a>
        </li>
      </ul>
    </nav>
  );
}
