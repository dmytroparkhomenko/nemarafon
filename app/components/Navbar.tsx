import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-[85px] md:top-[10%] w-[90%] md:w-fit bg-marine md:bg-transparent flex flex-col px-[48px] md:p-0 py-[20px] left-0 md:left-[5%] right-0 mx-auto md:mx-0 ease-linear font-titles font-light rounded-[20px] z-0">
      <ul className="flex flex-col gap-5">
        <li>
          <a href="#">ПРО МЕНЕ</a>
        </li>
        <li>
          <a href="#">ПРОГРАМИ</a>
        </li>
        <li>
          <a href="#">НЕМАРАФОН "2024"</a>
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
};

export default Navbar;
