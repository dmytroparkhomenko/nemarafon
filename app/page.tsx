"use server";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProgramsOverview from "@/app/program/ProgramsOverview";
import WhyMeItem from "./components/WhyMeItem";
import Heading from "./components/Heading";

import { Elipse } from "./components/symbols/symbols";
import Reviews from "./components/Reviews";
import Results from "./components/Results";
import { getPrograms } from "./api/programs-fetching";
import { ProgramCardProps } from "@/interfaces/interfaces";

export default async function Home() {
  const posts: ProgramCardProps = await getPrograms();

  return (
    <>
      <div className="relative h-screen overflow-y-auto bg-[#140702]">
        <div className="absolute w-full h-[100vh] md:h-[200vh] bg-cover bg-top z-0 bg-[url('/sources/main-mobile-bg.jpg')] md:bg-[url('/sources/main-bg.jpg')]" />
        <div className="absolute top-0 w-full z-10 h-[2000px] md:h-[4300px] bg-main-screen-gradient" />
        <div className="relative z-10 px-5 md:px-24 py-12 md:py-16">
          <div className="min-h-screen">
            <Header />
          </div>
          <section id="about-me" className="mb-24 md:mb-56">
            <Elipse
              styles={"w-[900px] h-[900px] hidden md:block blur-[65px]"}
            />
            <Heading>Про мене</Heading>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="flex justify-center w-full md:w-1/2">
                <img
                  className="w-full max-w-[500px] rounded-[15px] md:rounded-[50px] z-10"
                  src="/sources/about-me.jpg"
                  alt="About me"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 p-0 md:mt-0 md:px-5">
                <p className="font-light text-sm md:text-lg leading-tight">
                  Я розробила унікальні спортивні програми, засновані на
                  простих, але дуже ефективних вправах, які дозволять вам
                  сформувати міцне здоров’я, відмінне самопочуття та отримати
                  фігуру мрії, минаючи насильство під час тренувань та жорсткі
                  дієти
                </p>
                <h3 className="uppercase text-gold mt-10 mb-4 text-lg md:text-xl font-light text-center md:text-left">
                  Моя місія
                </h3>
                <h5 className="uppercase font-light text-base md:text-lg leading-tight text-white">
                  Не просто створити ідеальні та сексуальні форми, а й змінити
                  ваше ставлення до тренувань та харчування
                </h5>
              </div>
            </div>
          </section>
          <section id="why-me" className="relative mb-40">
            <div className="md:hidden">
              <Elipse
                styles={
                  "w-full max-m-[500px] h-[250px] blur-md rotate-[120deg] top-[-90px] left-0"
                }
              />
              <h2 className="text-ivory text-2xl md:text-4xl font-titles font-bold tracking-wide mb-16">
                Чому саме я?
              </h2>
            </div>
            <div className="border-b border-t border-ivory py-5 md:py-16 relative uppercase text-ivory flex justify-center">
              <Elipse
                styles={
                  "hidden md:block w-full h-full inset-0 rotate-[120deg] blur-none"
                }
              />
              <div className="hidden md:block absolute left-[-130px] right-0 inset-y-1/2">
                <div className="w-fit -rotate-90">
                  <span className="text-2xl md:text-4xl font-titles font-bold tracking-wide">
                    Чому саме я?
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center max-w-[750px] w-full z-10">
                <WhyMeItem />
              </div>
            </div>
          </section>
          <ProgramsOverview programs={posts} />
          <Results />
          <Reviews />
        </div>
        <Footer />
      </div>
    </>
  );
}
