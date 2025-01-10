/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "mainShadow": "0 4px 29px 0px rgb(0 0 0 / 0.10)",
        "xlTop": "0 5px 25px -5px rgb(0 0 0 / 0.1)"
      },
      colors: {
        "primaryColor": "rgb(37 99 235)",
        "secondaryColor": "rgb(20 184 166)",
        "secondaryColor-hover": "rgb(13 148 136)"
      }
    },
  },
  plugins: [],
}

