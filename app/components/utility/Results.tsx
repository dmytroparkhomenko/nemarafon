"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

import Heading from "../common/Heading";
import ScrollPointers from "../common/ScrollPointers";
import ResultPagePlaceholder from "@/public/sources/temp/results.png";

import { getResults } from "../../api/programs-fetching";
import { ResultsData } from "@/interfaces/interfaces";

export default function Results() {
  const scrollStudioResultsContainerRef = useRef<HTMLDivElement>(null);
  const scrollHomeResultsContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<ResultsData | null>(null);

  useEffect(() => {
    getResults().then(setImages).catch(console.error);
  }, []);

  return (
    <section id="results" className="my-40">
      <Heading>Немарафон 2024</Heading>
      <div>
        <p className="font-light uppercase text-center">
          Фотосесія дівчат в подарунок за результати в НЕмарафоні
        </p>
        <div
          className="flex items-center md:items-start flex-row overflow-x-auto space-x-6 scroll-smooth mt-10"
          ref={scrollStudioResultsContainerRef}
        >
          {images?.studioResultsCollection.map((image, i) => (
            <Image
              src={image.resultImage?.node.sourceUrl || ResultPagePlaceholder}
              alt={image.resultImage?.node.altText || "Result image"}
              style={{
                minWidth: "350px",
                height: "auto",
                borderRadius: "40px",
              }}
              key={i}
              width={350}
              height={197}
              layout="fixed"
            />
          ))}
        </div>
        <ScrollPointers containerRef={scrollStudioResultsContainerRef} />
      </div>
      <div>
        <p className="font-light uppercase text-center mt-20">
          Інші до/після фотозвіти моїх підлеглих після НЕмарафону
        </p>
        <div
          className="flex items-center md:items-start flex-row overflow-x-auto space-x-6 scroll-smooth mt-10"
          ref={scrollHomeResultsContainerRef}
        >
          {images?.homeResultsCollection.map((image, i) => (
            <Image
              src={image.resultImage.node.sourceUrl}
              alt={image.resultImage.node.altText}
              style={{
                minWidth: "350px",
                height: "auto",
                borderRadius: "40px",
              }}
              key={i}
              width={350}
              height={197}
              layout="fixed"
            />
          ))}
        </div>
        <ScrollPointers containerRef={scrollHomeResultsContainerRef} />
      </div>
    </section>
  );
}
