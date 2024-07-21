"use client";

import { useState } from "react";
import VideoList from "@/app/components/video/VideoList";
import VideoPlayer from "@/app/components/video/VideoPlayer";
import Loading from "./loading";
import Toggler from "@/app/components/common/Toggler";

import { ProgramNavigatorProps } from "@/interfaces/interfaces";

const ProgramNavigator: React.FC<ProgramNavigatorProps> = ({
  currentURI,
  program,
}) => {
  const selectedProgram = Array.isArray(program)
    ? program.find((p) => {
        return p.uri === `/${currentURI}/`;
      })
    : program;
  const content = selectedProgram?.programFields?.programContent;

  const [viewMode, setViewMode] = useState<"list" | "player">("list");

  if (!program) {
    return <Loading />;
  }

  const handleToggle = (isOn: boolean) => {
    setViewMode(isOn ? "player" : "list");
  };

  return (
    <div className="w-full md:w-2/3 mb-4 md:mb-0">
      <h3 className="text-white text-lg md:text-2xl font-light mb-8">
        {selectedProgram?.title}
      </h3>
      <div className="mb-4 flex items-center">
        <Toggler onToggle={handleToggle} />
        <span className="ml-2 text-white">програвач (економія ресурсів)</span>
      </div>
      {viewMode === "player" ? (
        <VideoPlayer content={content} currentURI={currentURI} />
      ) : (
        <VideoList currentURI={currentURI} content={content} />
      )}
    </div>
  );
};

export default ProgramNavigator;
