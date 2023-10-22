/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/scripts/home.js"],
  theme: {
    extend: {
      fontFamily: {
        anr: ["myriad-pro"],
        condensed: ["myriad-pro-condensed", "sans-serif"],
      },
      colors: {
        "anr-blue": "#005fae",
        "anr-light-blue": "#3aa8e4",
        "anr-gold": "#fdbd10",
      },
    },
  },
  plugins: [],
};
