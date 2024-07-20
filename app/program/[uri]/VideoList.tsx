"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Arrow from "@/app/components/symbols/Arrow.svg";
import VideoEmbed from "@/app/components/video/VideoEmbed";
import Loading from "./loading";
import { saveLastViewedPage, getLastViewedPage } from "./videoPageStorage";

interface VideoListProps {
  content: Array<{
    programVideoLink: string;
  }>;
  currentURI: string;
}

const VideoList: React.FC<VideoListProps> = ({ content, currentURI }) => {
  const initialPage = getLastViewedPage(currentURI);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const videosPerPage = 6;

  useEffect(() => {
    saveLastViewedPage(currentURI, currentPage);
  }, [currentPage, currentURI]);

  const handleNextPage = () => {
    if ((currentPage + 1) * videosPerPage < content.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * videosPerPage;
  const currentVideos = content.slice(startIndex, startIndex + videosPerPage);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentVideos && currentVideos.length > 0 ? (
          currentVideos.map((video, index) => (
            <div key={index} className="w-full">
              <VideoEmbed embedId={video.programVideoLink} />
            </div>
          ))
        ) : (
          <p>No video content available.</p>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <a
          className="flex items-center gap-1 text-sm cursor-pointer"
          onClick={handlePreviousPage}
          style={{ visibility: currentPage === 0 ? "hidden" : "visible" }}
        >
          <Image
            src={Arrow}
            alt="arrow left"
            className="cursor-pointer transform w-6 color-white"
          />
          <span className="hidden md:block">Попередня сторінка</span>
        </a>
        <div className="uppercase font-bold text-gold text-sm md:text-[18px]">
          <span>Сторінка {currentPage + 1}</span>
        </div>
        <a
          className="flex items-center gap-1 text-sm cursor-pointer"
          onClick={handleNextPage}
          style={{
            visibility:
              (currentPage + 1) * videosPerPage >= content.length
                ? "hidden"
                : "visible",
          }}
        >
          <span className="hidden md:block">Наступна сторінка</span>
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

export default VideoList;
