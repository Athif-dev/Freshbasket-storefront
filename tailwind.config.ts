import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Center the container
        padding: {
          DEFAULT: "1rem", // Default padding for all screens
          sm: "1rem", // Padding for small screens
          md: "2rem", // Padding for medium screens
          lg: "3rem", // Padding for large screens
          xl: "10rem", // Padding for extra-large screens
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "main-green": "#3BB77E",
        "custom-black": "#253D4E",
      },
    },
  },
  plugins: [],
};
export default config;
