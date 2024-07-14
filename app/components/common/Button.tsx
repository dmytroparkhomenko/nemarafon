import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  className?: string;
  type?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Button({
  href,
  children,
  onClick,
  className,
  type,
}: ButtonProps) {
  return (
    <Link
      href={href || "#"}
      passHref
      type={type || "button"}
      onClick={onClick}
      className={`w-full py-[6px] md:py-[8px] bg-marine rounded-full text-center font-light text-[16px] md:text-[20px] uppercase ${className}`}
    >
      {children}
    </Link>
  );
}
