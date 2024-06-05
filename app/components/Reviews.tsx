"use client";

import Image from "next/image";
import { useRef } from "react";

import ScrollPointers from "./ScrollPointers";
import Heading from "./Heading";
import Star from "./symbols/Star.svg";

// temp
import Review from "@/public/sources/temp/review.png";

export default function Reviews() {
  const scrollReviewsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mt-40 mb-20">
      <Heading>Відгуки</Heading>
      <div
        className="flex items-center md:items-start flex-row overflow-x-auto space-x-6 scroll-smooth mt-10 gap-5 md:gap-10"
        ref={scrollReviewsContainerRef}
      >
        <div className="flex flex-col md:flex-row p-3 gap-6 w-full md:min-w-[600px]">
          <Image
            src={Review}
            alt="review author"
            className="w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
          />
          <div className="flex flex-col gap-2 font-montserrat uppercase">
            <div className="font-medium text-2xl">Макс</div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-7">
              <div className="md:text-lg font-light">План харчування</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={Star}
                    alt="review star"
                    width={20}
                    className="mr-1"
                  />
                ))}
              </div>
            </div>
            <p className="lowercase mt-4 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              aspernatur earum dolor necessitatibus. Voluptatum, eum!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-3 gap-6 w-full md:min-w-[600px]">
          <Image
            src={Review}
            alt="review author"
            className="w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
          />
          <div className="flex flex-col gap-2 font-montserrat uppercase">
            <div className="font-medium text-2xl">Макс</div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-7">
              <div className="md:text-lg font-light">План харчування</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={Star}
                    alt="review star"
                    width={20}
                    className="mr-1"
                  />
                ))}
              </div>
            </div>
            <p className="lowercase mt-4 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              aspernatur earum dolor necessitatibus. Voluptatum, eum!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-3 gap-6 w-full md:min-w-[600px]">
          <Image
            src={Review}
            alt="review author"
            className="w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
          />
          <div className="flex flex-col gap-2 font-montserrat uppercase">
            <div className="font-medium text-2xl">Макс</div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-7">
              <div className="md:text-lg font-light">План харчування</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    src={Star}
                    alt="review star"
                    width={20}
                    className="mr-1"
                  />
                ))}
              </div>
            </div>
            <p className="lowercase mt-4 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              aspernatur earum dolor necessitatibus. Voluptatum, eum!
            </p>
          </div>
        </div>
      </div>
      <ScrollPointers containerRef={scrollReviewsContainerRef} />
    </section>
  );
}
