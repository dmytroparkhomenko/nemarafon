import Header from "@/app/components/Header";
import { Elipse } from "./components/symbols/symbols";

export default function Home() {
  return (
    <>
      <div className="relative h-screen overflow-y-auto">
        <div className="absolute w-full h-[100vh] md:h-[200vh] bg-cover bg-top z-0 bg-[url('/sources/main-mobile-bg.png')] md:bg-[url('/sources/main-bg.png')]" />
        <div className="absolute top-0 w-full z-10 h-[2000px] md:h-[4300px] bg-main-screen-gradient" />
        <div className="relative z-20 px-5 md:px-24 py-12 md:py-16">
          <Header />
          <section>
            <Elipse />
            <h2 className="mb-10 md:mb-28 text-2xl md:text-4xl">Про мене</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex justify-center w-full md:w-1/2">
                <img
                  className="w-full max-w-[500px] rounded-[15px] md:rounded-[50px] z-10"
                  src="/sources/about-me.png"
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
                <h5 className="uppercase font-light text-base md:text-lg leading-tight">
                  Не просто створити ідеальні та сексуальні форми, а й змінити
                  ваше ставлення до тренувань та харчування
                </h5>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
