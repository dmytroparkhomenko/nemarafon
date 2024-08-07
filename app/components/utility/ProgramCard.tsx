"use client";

import { useState } from "react";
import Image from "next/image";
import Vector from "@/app/components/symbols/Vector.svg";

import { ProgramCardProps } from "@/interfaces/interfaces";
import Button from "../common/Button";

export default function ProgramCard({
  title,
  programFields,
  uri,
}: ProgramCardProps) {
  const [isOpen, setOpen] = useState(false);
  const backgroundImageUrl =
    programFields.programCardBackground?.node?.sourceUrl ||
    "/sources/temp/card0.jpg";

  return (
    <div
      className="relative flex flex-col justify-between rounded-[40px] py-16 px-12 w-full md:min-w-[600px] min-h-[400px] bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {programFields.programPrice !== null &&
      programFields.programPrice < 5900 ? (
        <div className="absolute top-0 left-0 w-full py-2 text-center bg-[#c24040] rounded-t-[50px] border-b border-b-white">
          🎉 Супер пропозиція: -50%
        </div>
      ) : null}
      <div>
        <h3 className="md:hidden">
          {title === "Тренування в залі та вдома" ? (
            <>
              Тренування <br /> в залі та вдома
            </>
          ) : (
            title
          )}
        </h3>
        <h3 className="text-ivory md:text-marine hidden md:block">{title}</h3>
        <ul className={`${!isOpen ? "hidden" : "block"} md:block mt-6`}>
          {programFields.programDescription?.map((description, index) => (
            <li key={index} className="font-light mb-[0.5rem]">
              - {description.programDescriptionItem}
            </li>
          ))}
        </ul>

        <div
          onClick={() => setOpen(!isOpen)}
          className="block md:hidden my-4 mx-auto text-center cursor-pointer"
        >
          <span className="text-marine">
            {isOpen ? "Сховати" : "Докладніше"}
          </span>
          <Image
            src={Vector}
            alt="vector"
            className="mx-auto"
            style={isOpen ? { rotate: "180deg" } : { rotate: "0deg" }}
          />
        </div>
      </div>

      <div>
        <div className={`text-center flex flex-col items-center md:mt-5`}>
          {programFields.programPrice !== null &&
          programFields.programPrice < 5900 ? (
            <div className="flex flex-row gap-3">
              <span className="text-lg font-light font-montserrat line-through text-[#cccccc]">
                ₴ {programFields.programPrice * 2}
              </span>
              <div className="text-4xl font-light font-montserrat">
                ₴ {programFields.programPrice}
              </div>
            </div>
          ) : (
            <div className="text-4xl font-light font-montserrat">
              ₴ {programFields.programPrice}
            </div>
          )}
          <Button className="md:w-2/3 mt-9" href={`/program/${uri}`}>
            обрати програму
          </Button>
          {/* hardcode */}
          {programFields.programPrice == 5900 ? (
            <Button
              className="mt-3 md:w-2/3 bg-transparent border border-marine normal-case	"
              href={`/program/${uri}`}
            >
              Візьму 3 за 14699грн!
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
