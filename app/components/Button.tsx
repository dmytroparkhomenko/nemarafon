import Link from "next/link";

interface ButtonProps {
  href: string;
  children: any;
}

export default function Button(props: ButtonProps) {
  return (
    <Link
      className={
        "w-full md:w-2/3 mt-9 py-[6px] md:py-[8px] bg-marine rounded-full text-center"
      }
      href={props.href}
    >
      <button className="font-light text-[20px] uppercase">
        {props.children}
      </button>
    </Link>
  );
}
