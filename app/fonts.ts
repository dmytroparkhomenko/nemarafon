import localFont from "next/font/local";

export const nextArtFont = localFont({
  src: [
    { path: "/fonts/NEXT_ART_Light.otf", weight: "300" },
    { path: "/fonts/NEXT_ART_Regular.otf", weight: "400" },
    { path: "/fonts/NEXT_ART_SemiBold.otf", weight: "600" },
    { path: "/fonts/NEXT_ART_Bold.otf", weight: "700" },
    { path: "/fonts/NEXT_ART_Heavy.otf", weight: "900" },
  ],
  display: "swap",
  preload: true,
});
