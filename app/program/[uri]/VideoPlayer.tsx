"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Arrow from "@/app/components/symbols/Arrow.svg";
import VideoEmbed from "@/app/components/video/VideoEmbed";
import Loading from "./loading";
import {
  incrementWatchedVideos,
  saveLastWatchedVideo,
  getLastWatchedVideo,
} from "./videoCounterStorage";

interface VideoPlayerProps {
  content: Array<{
    programVideoLink: string;
  }>;
  currentURI: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, currentURI }) => {
  const initialVideoId = getLastWatchedVideo(currentURI);
  const [currentVideoId, setCurrentVideoId] = useState(initialVideoId);

  const handleNextVideo = () => {
    const nextVideoId = currentVideoId + 1;
    if (nextVideoId < content.length) {
      setCurrentVideoId(nextVideoId);
      incrementWatchedVideos(currentURI);
      saveLastWatchedVideo(currentURI, nextVideoId);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoId > 0) {
      const prevVideoId = currentVideoId - 1;
      setCurrentVideoId(prevVideoId);
      saveLastWatchedVideo(currentURI, prevVideoId);
    }
  };

  const videoLink =
    content && content.length > 0
      ? content[currentVideoId].programVideoLink
      : null;

  return (
    <>
      <Suspense fallback={<Loading />}>
        {videoLink ? (
          <VideoEmbed embedId={videoLink} styling={"h-[450px] md:h-[550px]"} />
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
        <div className="uppercase font-bold text-gold text-sm md:text-[18px]">
          <span>Відео #{currentVideoId + 1}</span>
        </div>
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
    </>
  );
};

export default VideoPlayer;
