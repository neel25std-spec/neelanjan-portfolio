import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "Bebas Neue", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        "great-vibes": ["var(--font-great-vibes)", "Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
