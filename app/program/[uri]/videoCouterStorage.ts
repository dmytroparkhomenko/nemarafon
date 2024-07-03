// temp
const WATCHED_COUNT_KEY = "watchedVideosCount";
const LAST_WATCHED_VIDEO_KEY = "lastWatchedVideo";

export function incrementWatchedVideos() {
  const currentCount = parseInt(
    localStorage.getItem(WATCHED_COUNT_KEY) || "0",
    10
  );
  localStorage.setItem(WATCHED_COUNT_KEY, (currentCount + 1).toString());
}

export function saveLastWatchedVideo(videoId: any) {
  localStorage.setItem(LAST_WATCHED_VIDEO_KEY, videoId.toString());
}

export function getLastWatchedVideo() {
  return parseInt(localStorage.getItem(LAST_WATCHED_VIDEO_KEY) || "0", 10);
}

export function getWatchedVideosCount() {
  return parseInt(localStorage.getItem(WATCHED_COUNT_KEY) || "0", 10);
}
