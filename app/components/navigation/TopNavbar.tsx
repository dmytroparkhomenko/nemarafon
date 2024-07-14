import Link from "next/link";
import Image from "next/image";
import Plus from "@/app/components/symbols/Plus.svg";

interface TopNavbarProps {
  myProgram: string;
  isProgramPage?: boolean;
}

const programPageStyles = "flex items-center gap-1 text-marine";

const TopNavbar: React.FC<TopNavbarProps> = ({
  myProgram,
  isProgramPage = true,
}) => {
  return (
    <nav className="w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]">
      <ul className="flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start uppercase">
        <li className={`${isProgramPage ? programPageStyles : null}`}>
          <Link href={myProgram}>Моя програма</Link>
          {isProgramPage ? (
            <Image
              src={Plus}
              alt="Plus"
              className="cursor-pointer transform w-8"
            />
          ) : null}
        </li>
        <li className={`${isProgramPage ? null : programPageStyles}`}>
          <Link href="/profile/">Профіль</Link>
          {isProgramPage ? null : (
            <Image
              src={Plus}
              alt="Plus"
              className="cursor-pointer transform w-8"
            />
          )}
        </li>
        <li>
          <Link href="../">Головна</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
