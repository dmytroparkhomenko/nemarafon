"use client";

import Image from "next/image";
import { Suspense, useState } from "react";

import Arrow from "@/app/components/symbols/Arrow.svg";

import VideoEmbed from "@/app/components/VideoEmbed";
import Loading from "./loading";

import { ProgramNavigatorProps } from "@/interfaces/interfaces";
import {
  incrementWatchedVideos,
  saveLastWatchedVideo,
  getLastWatchedVideo,
} from "./videoCouterStorage";

const ProgramNavigator: React.FC<ProgramNavigatorProps> = ({ program }) => {
  const [currentVideoId, setCurrentVideoId] = useState(getLastWatchedVideo());
  const content = program?.programFields?.programContent;

  const handleNextVideo = () => {
    const nextVideoId = currentVideoId + 1;
    if (nextVideoId < content.length) {
      setCurrentVideoId(nextVideoId);
      incrementWatchedVideos();
      saveLastWatchedVideo(nextVideoId);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoId > 0) {
      setCurrentVideoId(currentVideoId - 1);
      saveLastWatchedVideo(currentVideoId - 1);
    }
  };

  const videoLink =
    content && content.length > 0
      ? content[currentVideoId].programVideoLink
      : null;

  if (!program) {
    return <Loading />;
  }

  return (
    <div className="w-full md:w-2/3">
      <h3 className="text-white text-lg md:text-2xl font-light mb-6">
        {program?.title}
      </h3>
      <Suspense fallback={<Loading />}>
        {videoLink ? (
          <VideoEmbed embedId={videoLink} />
        ) : (
          <p>No video content available.</p>
        )}
      </Suspense>
      <div className="flex justify-between mt-2">
        <a
          className="flex items-center gap-1 text-sm cursor-pointer"
          onClick={handlePreviousVideo}
        >
          <Image
            src={Arrow}
            alt="arrow left"
            className="cursor-pointer transform w-6 color-white"
          />
          <span className="hidden md:block">Попереднє відео</span>
        </a>
        <span className="uppercase text-gold text-sm md:text-[18px]">
          <b>#{currentVideoId + 1}: </b>
          Назва лекції
        </span>
        <a
          className="flex items-center gap-1 text-sm cursor-pointer"
          onClick={handleNextVideo}
        >
          <span className="hidden md:block">Наступне відео</span>
          <Image
            src={Arrow}
            alt="arrow right"
            className="cursor-pointer transform rotate-180 w-6 color-white"
          />
        </a>
      </div>
    </div>
  );
};

export default ProgramNavigator;
