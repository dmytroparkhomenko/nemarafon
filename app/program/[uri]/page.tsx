"use server";

import Image from "next/image";
import Link from "next/link";

import Plus from "@/app/components/symbols/Plus.svg";
import { ProgramCardProps } from "@/interfaces/interfaces";

import { HeaderProgramPage } from "@/app/components/Header";

import { getPrograms } from "@/app/api/programs-fetching/index";
import ProgramNavigator from "./ProgramNavigator";

export default async function ProgramPage({ params }: any) {
  const posts: ProgramCardProps[] = await getPrograms();
  const { uri } = params;

  const post: ProgramCardProps | undefined = posts.find(
    (post) => post.uri === `/${uri}/`
  );

  return (
    <>
      <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
        <HeaderProgramPage />
        <div className="flex flex-col md:flex-row justify-between md:py-6">
          <nav
            className={`w-full md:w-1/3 my-[30px] justify-center flex flex-col md:p-0 font-titles font-light md:mt-[-50px]`} // md:mt-[-50px]
          >
            <ul
              className={`flex flex-row md:flex-col gap-8 text-sm md:text-lg justify-center items-center md:items-start`}
            >
              <li className="flex items-center gap-1 text-marine">
                <Link href="#">Моя програма</Link>
                <Image
                  src={Plus}
                  alt="Plus"
                  className="cursor-pointer transform w-8"
                />
              </li>
              <li>
                <Link href="/profile/">Профіль</Link>
              </li>
              <li>
                <Link href="../">Головна</Link>
              </li>
            </ul>
          </nav>
          <ProgramNavigator post={post} />
        </div>
      </main>
    </>
  );
}
