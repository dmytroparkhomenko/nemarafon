// temp
const WATCHED_COUNT_KEY = "watchedVideosCount_";
const LAST_WATCHED_VIDEO_KEY = "lastWatchedVideo_";

export function incrementWatchedVideos(programURI: string) {
  const key = WATCHED_COUNT_KEY + programURI;
  const currentCount = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, (currentCount + 1).toString());
}

export function saveLastWatchedVideo(programURI: string, videoId: number) {
  const key = LAST_WATCHED_VIDEO_KEY + programURI;
  localStorage.setItem(key, videoId.toString());
}

export function getLastWatchedVideo(programURI: string) {
  const key = LAST_WATCHED_VIDEO_KEY + programURI;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

export function getWatchedVideosCount(programURI: string) {
  const key = WATCHED_COUNT_KEY + programURI;
  return parseInt(localStorage.getItem(key) || "0", 10);
}
