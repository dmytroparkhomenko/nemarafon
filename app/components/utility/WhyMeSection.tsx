"use client";

import { getWhyMeSection } from "@/app/api/programs-fetching";
import React, { useEffect, useState } from "react";

interface WhyMeSectionItem {
  whymesectionRepeaterItem: {
    whymesectionRepeaterItemTitle: string;
    whymesectionRepeaterItemContent: string;
  };
}

export default function WhyMeSection() {
  const [sections, setSections] = useState<WhyMeSectionItem[]>([]);

  useEffect(() => {
    getWhyMeSection()
      .then((data: any) => {
        setSections(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {sections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center text-center md:text-left my-6 gap-2"
        >
          <span className="text-white text-6xl md:text-8xl font-bold md:mr-14 font-titles max-w-[30px]">
            {index + 1}
          </span>
          <div className="flex flex-col">
            <h3 className="uppercase text-marine font-light mb-2 text-xl md:text-2xl font-titles md:text-left text-center">
              {section.whymesectionRepeaterItem.whymesectionRepeaterItemTitle}
            </h3>
            <p className="text-white normal-case text-base md:text-lg font-light leading-tight">
              {section.whymesectionRepeaterItem.whymesectionRepeaterItemContent}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
