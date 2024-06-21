"use client";

import Image from "next/image";
import { Suspense, useState } from "react";

import Arrow from "@/app/components/symbols/Arrow.svg";

import VideoEmbed from "@/app/components/VideoEmbed";
import Loading from "./loading";

export default function ProgramNavigator({ post }: any) {
  const [currentVideoId, setVideoId] = useState(0);

  const content: any = post?.programFields?.programContent;

  return (
    <div className="w-full md:w-2/3">
      <h3 className="text-white text-lg md:text-2xl font-light mb-6">
        {post?.title}
      </h3>
      <Suspense fallback={<Loading />}>
        <VideoEmbed embedId={content[currentVideoId].programVideoLink} />
      </Suspense>
      <div className="flex justify-between mt-2">
        {currentVideoId <= 0 ? null : (
          <a
            className="flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => setVideoId(currentVideoId - 1)}
          >
            <Image
              src={Arrow}
              alt="arrow left"
              className="cursor-pointer transform w-6 color-white"
            />
            <span className="font-light">Попереднє відео</span>
          </a>
        )}
        <span className="uppercase text-gold text-sm md:text-[18px]">
          {/* #{currentVideoId + 1} */}
          Назва лекції
        </span>
        {currentVideoId === content.length - 1 ? null : (
          <a
            className="flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => setVideoId(currentVideoId + 1)}
          >
            <span className="font-light">Наступне відео</span>
            <Image
              src={Arrow}
              alt="arrow right"
              className="cursor-pointer transform rotate-180 w-6 color-white"
            />
          </a>
        )}
      </div>
    </div>
  );
}
