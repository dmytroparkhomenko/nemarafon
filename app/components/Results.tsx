"use client";

import Image from "next/image";
import { useRef } from "react";

import Heading from "./Heading";
import ScrollPointers from "./ScrollPointers";

// temp
import ResultsImages from "@/public/sources/temp/results.png";

export default function Results() {
  const scrollResultsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="results" className="my-40">
      <Heading>Немарафон 2024</Heading>
      <p className="font-light uppercase text-center">
        Ви можете побачити та надихнутись успіхами моїх підлеглих
      </p>
      <div
        className="flex items-center md:items-start flex-row overflow-x-auto space-x-6 scroll-smooth mt-10"
        ref={scrollResultsContainerRef}
      >
        {/* temp */}
        {[...Array(10)].map((_, i) => (
          <Image
            src={ResultsImages}
            alt="results"
            style={{ minWidth: "350px", height: "auto" }}
            key={i}
          />
        ))}
      </div>
      <ScrollPointers containerRef={scrollResultsContainerRef} />
    </section>
  );
}
