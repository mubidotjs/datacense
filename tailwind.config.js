/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "datasense-blue": "#101A32",
        "datasense-blue-container": "#101A32",
        "minor-blue": "#E3EBF7",
        "light-gray": "#F7F7F7",
        "light-search-bg": "#F0F0F0",
      },
    },
  },
  plugins: [],
};
