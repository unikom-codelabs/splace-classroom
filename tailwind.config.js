import { nextui } from "@nextui-org/theme";
import { getColors } from "./utils/getSettings";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "var(--dark-blue)",
        "light-blue": "#C0D4F6",
        background: "#F8F8F8",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
