import Loading from "@/app/loading";
import { Suspense } from "react";

const VideoEmbed = ({ embedId, styling }: any) => (
  <Suspense fallback={<Loading />}>
    <div className="video-responsive">
      <iframe
        width="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className={styling}
      />
    </div>
  </Suspense>
);

export default VideoEmbed;
