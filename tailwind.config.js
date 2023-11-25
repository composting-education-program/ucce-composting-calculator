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
        "anr-off-blue": "#003c61",
        "anr-red" : "#ab312c",
        "anr-green" : "#67893e"
      },
      screens: {
        tablet: "520px",
        // => @media (min-width: 576px) { ... }

        laptop: "992px",
        // => @media (min-width: 992px) { ... }

        desktop: "1200px",
        // => @media (min-width: 1200px) { ... }
      },
    },
  },
  plugins: [],
};
