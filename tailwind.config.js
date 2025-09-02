/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mongolian: [
          "MongolianScript",
          "Mongolian Baiti",
          "Microsoft Mongolian Baiti",
          "Menksoft Qagan",
          "TraditionalMongolian",
          "Mongolian White",
          "serif",
        ],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
