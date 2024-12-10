/** @type {import('tailwindcss').Config} */
// import withMT from "@material-tailwind/react/utils/withMT";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // fontfamily: {
  //   saan: require('tailwindcss-font-inter'),
  // }
  fontFamily: {
        sans: ['tailwindcss-font-inter'],
    },
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}