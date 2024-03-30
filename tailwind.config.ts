import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#E2F3F5",
        accentColor: "#3D5AF1",
        betaColor: "#120f25a4",
        alphaColor: "#36315f70",
        accentColor2: "#C850F2",
        primaryColor: "#0E153A",
        secondaryColor: "#22D1EE",
      },
      fontFamily: {
        secondaryFont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
