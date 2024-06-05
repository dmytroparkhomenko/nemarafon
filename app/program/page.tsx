"use client";

import { useRef } from "react";

import ScrollPointers from "../components/ScrollPointers";
import Heading from "../components/Heading";
import ProgramCard from "../components/ProgramCard";

import { ProgramCardProps } from "@/interfaces/interfaces";

export default function Programs({ programs }: any) {
  const scrollProgramsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="my-40">
      <Heading>Програми</Heading>
      <div
        className="flex flex-col md:flex-row overflow-x-auto space-y-6 md:space-y-0 md:space-x-6 space-x-0 scroll-smooth"
        ref={scrollProgramsContainerRef}
      >
        {programs.map((post: ProgramCardProps) => (
          <ProgramCard
            title={post.title}
            programFields={post.programFields}
            uri={post.uri}
            key={post.uri}
          />
        ))}
      </div>
      <div className="hidden md:flex justify-end">
        <ScrollPointers containerRef={scrollProgramsContainerRef} />
      </div>
    </section>
  );
}
