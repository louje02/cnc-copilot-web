import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a1628",
          800: "#0f2038",
          700: "#142a48",
          600: "#1a3a5c",
        },
        steel: {
          100: "#f0f2f5",
          200: "#d8dde5",
          300: "#b0b8c5",
          400: "#8892a2",
          500: "#636e80",
        },
        accent: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
