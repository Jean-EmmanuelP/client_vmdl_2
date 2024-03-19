import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'vignetage': 'radial-gradient(ellipse, rgba(249,249,249, 0) 45%, rgb(249,249,249) 55%)',
      },
      fontFamily: {
        'riviera': ['Riviera', 'sans-serif'],
        'futura': ['Futura', 'sans-serif'],
        'larsseit': ['Larsseit', 'sans-serif']
      },
      colors: { 
        'noir': '#030303',
        'blanc': '#F9F9F9',
        'boxesColor': '#FF9B20',
      }
    },
  },
  plugins: [],
};
export default config;
