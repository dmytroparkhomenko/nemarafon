// temp
const LAST_VIEWED_PAGE_KEY = "lastViewedPage_";

export function saveLastViewedPage(programURI: string, page: number) {
  const key = LAST_VIEWED_PAGE_KEY + programURI;
  localStorage.setItem(key, page.toString());
}

export function getLastViewedPage(programURI: string) {
  const key = LAST_VIEWED_PAGE_KEY + programURI;
  return parseInt(localStorage.getItem(key) || "0", 10);
}
