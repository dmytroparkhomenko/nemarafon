import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-screen-gradient":
          "linear-gradient(180deg, rgba(0,0,0,0) 8%, #392C27 36%, #23150F 70%, rgba(0,0,0,0) 100%)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        titles: ["NEXT ART", "sans-serif"],
      },
      fontSize: {
        "2xl": "1.75rem", // For h1
        xl: "1.5rem", // For h2
        lg: "1.25rem", // For h3
        base: "1rem", // For normal text
        sm: "0.875rem", // For small text
      },
      colors: {
        ivory: "#b6f2f2",
        marine: "#0a9393",
        gold: "#fa9620",
        disables: "#a5a3a3",
        error: "#ff0000",
      },
    },
  },
  plugins: [],
};
export default config;
