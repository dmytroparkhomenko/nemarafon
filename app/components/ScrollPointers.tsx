import { RefObject } from "react";
import Image from "next/image";
import Arrow from "./symbols/Arrow.svg";

import { ScrollPointersProps } from "@/interfaces/interfaces";

const scrollLeft = (containerRef: RefObject<HTMLDivElement>) => {
  if (containerRef.current) {
    containerRef.current.scrollBy({ left: -650, behavior: "smooth" });
  }
};

const scrollRight = (containerRef: RefObject<HTMLDivElement>) => {
  if (containerRef.current) {
    containerRef.current.scrollBy({ left: 650, behavior: "smooth" });
  }
};

export default function ScrollPointers({ containerRef }: ScrollPointersProps) {
  return (
    <>
      <div className="flex flex-row items-center mt-4 justify-between md:justify-end space-x-4">
        <Image
          src={Arrow}
          alt="scroll left"
          onClick={() => scrollLeft(containerRef)}
          className="cursor-pointer"
        />
        <Image
          src={Arrow}
          alt="scroll right"
          onClick={() => scrollRight(containerRef)}
          className="cursor-pointer transform rotate-180"
        />
      </div>
    </>
  );
}
