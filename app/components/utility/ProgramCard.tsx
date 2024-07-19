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
      className="flex flex-col justify-between rounded-[40px] py-16 px-12 w-full md:min-w-[600px] min-h-[400px] bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
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
        <div className="text-center flex flex-col items-center md:mt-5">
          <div className="text-4xl font-light font-montserrat">
            ₴ {programFields.programPrice}
          </div>
          <Button className="mt-9 md:w-2/3" href={`/program/${uri}`}>
            обрати програму
          </Button>
        </div>
      </div>
    </div>
  );
}
